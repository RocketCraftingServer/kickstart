(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
class SimpleBtn extends _safir.BaseComponent {
  id = '';
  text = '';
  ready = () => {};
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }
  onClick = this.clickBind;
  render = () => `
    <button class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
exports.default = SimpleBtn;

},{"safir":5}],2:[function(require,module,exports){
"use strict";

var _safir = require("safir");
var _rocketCraftingAccount = _interopRequireDefault(require("./layouts/rocket-crafting-account"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _safir.Safir();
(0, _safir.On)("app.ready", () => {
  /**
   * @description
   * If you put http://localhost then you 
   * need to run rocketCreftingServer on local mashine.
   * You can use also `http://maximumroulette.com`
   */
  let apiDomain = 'https://maximumroulette.com';
  // let apiDomain = 'http://localhost';
  app.loadComponent(new _rocketCraftingAccount.default(apiDomain), 'bg-transparent');
  document.body.classList.add('funnyBg2');
});
window.app = app;

},{"./layouts/rocket-crafting-account":4,"safir":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
let Avatar = arg => `
  <img class="avatarProfile" alt="${arg.key1}" src="${arg.apiDomain}/storage${arg.res[arg.key][arg.key1]}" />;
`;
exports.Avatar = Avatar;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
var _simpleBtn = _interopRequireDefault(require("../components/simple-btn"));
var _imageProfile = require("../direct-render/imageProfile");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RocketCraftingLayout extends _safir.BaseComponent {
  id = 'my-body';
  apiDomain = '';
  loginBtn = new _simpleBtn.default({
    text: 'Login',
    id: 'loginBtn'
  }, 'w30');
  registerBtn = new _simpleBtn.default({
    text: 'Register',
    id: 'registerBtn'
  }, 'w30');
  nickname = null;
  email = null;
  token = null;
  photo = null;
  constructor(arg) {
    super(arg);
    console.info('[RC ARGS]:', arg);
    this.apiDomain = arg;
    (0, _safir.On)('loginBtn', data => {
      console.info('[login] Trigger Btn', data.detail);
      this.runApiCall('login');
    });
    (0, _safir.On)('registerBtn', data => {
      console.info('[register] Trigger Btn', data.detail);
      this.runApiCall('register');
    });
  }
  ready = () => {
    console.log('RocketCrafting Login form ready.');
    console.log('RocketCrafting FAST Login form ready. try this', this.email);
    if (sessionStorage.getItem('my-body-email') != null && sessionStorage.getItem('my-body-token') != null) {
      this.runApiFastLogin();
    }
  };
  async runApiCall(apiCallFlag) {
    let route = this.apiDomain || location.origin;
    const args = {
      emailField: (0, _safir.byID)('arg-username').value,
      passwordField: (0, _safir.byID)('arg-password').value
    };
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }
  async runApiFastLogin() {
    // must be fixed this.email at this moment
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token')
    };
    const rawResponse = await fetch(route + '/rocket/fast-login', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }
  async runUploadAvatar(apiCallFlag) {
    let route = this.apiDomain || location.origin;
    const args = {
      email: this.email,
      token: this.token,
      photo: this.photo
    };
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  // Best way - intergalactic
  exploreResponse(res) {
    (0, _safir.byID)('apiResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        for (let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
        }
      } else {
        if (key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
        } else if (res[key] == 'USER_LOGGED') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
    // how to use sub rerender
    console.log(" TEST #######");
    // simple override
    this.render = this.accountRender;
    (0, _safir.getComp)(this.id).innerHTML = this.render();
    this.accountData(res);
  }

  // Best way - intergalactic
  accountData(res) {
    (0, _safir.byID)('apiResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        for (let key1 in res[key]) {
          if (key1 == 'profileImage') {
            (0, _safir.byID)('apiResponse').innerHTML += (0, _imageProfile.Avatar)({
              key,
              key1,
              res,
              apiDomain: this.apiDomain
            });
            // hot to use in runtime attaching:
            (0, _safir.byID)('apiResponse').innerHTML += `<input type="file" id="avatar" />`;
            (0, _safir.byID)('apiResponse').innerHTML += `<button type="file" id="uploadAvatar">CHANGE AVATAR</button>`;
            (0, _safir.byID)('avatar').addEventListener('change', this.handleFileUpload, {
              passive: true
            });
            (0, _safir.byID)('uploadAvatar').addEventListener('click', this.handleAvatarUpload, {
              passive: true
            });
          } else {
            this.setPropById(key1, res[key][key1], 1);
            (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
          }
        }
      } else {
        if (res[key] == 'USER_LOGGED') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${res[key]} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
  }
  handleAvatarUpload = e => {
    this.runUploadAvatar('profile/upload');
  };
  handleFileUpload = e => {
    const reader = new FileReader();
    let rawImg;
    reader.onloadend = () => {
      rawImg = reader.result;
      this.setPropById('photo', rawImg);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  accountRender = () => `
    <div class='midWrapper bg-transparent'>
      <div  class='middle'>
        <h2>Welcome, <h2 id='nickname'>${this.nickname}</h2></h2>
      </div>
      <span id="apiResponse"></span>
      <div class='midWrapper bg-transparent'>
       <h2> Safir Vanilla Virtual DOM</h2>
      </div>
    </div>
  `;
  render = () => `
    <div class="paddingtop20 animate-jello2 bg-transparent textCenter">
      <h2 class='blackText' >Safir extreme simple networking 🌍</h2>
      <p class="textColorWhite">Account login/register/confirmation</p>
      <p class="textColorWhite">Safir can be used for any web api server.</p>
      <p class="textColorWhite">In this example safir use <a href="https://github.com/RocketCraftingServer/rocket-craft-server" >rocketCraftingServer</a></p>
      <p class="textColorWhite">RocketCraftingServer is simple REST/HTTP server. It is used also in ue4 
     <a href="https://github.com/RocketCraftingServer/rocket-craft">rocketCraft</a> project.</p>

    </div>
    <div class="midWrapper animate-jello2 bg-transparent">
        <input class="w30" id='arg-username' type='text' value='zlatnaspirala@gmail.com' />
        <input class="w30" id='arg-password' type='password' value='12345678' />
        ${this.loginBtn.renderId()}
        ${this.registerBtn.renderId()}
    </div>

    <div class='midWrapper bg-transparent' >
      <span id="apiResponse"></span>
    </div>
  `;
}
exports.default = RocketCraftingLayout;

},{"../components/simple-btn":1,"../direct-render/imageProfile":3,"safir":5}],5:[function(require,module,exports){
'use strict';

/**
 * @description
 * Main export file for Safir.
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseComponent", {
  enumerable: true,
  get: function () {
    return _comp.BaseComponent;
  }
});
Object.defineProperty(exports, "JSON_HEADER", {
  enumerable: true,
  get: function () {
    return _utils.JSON_HEADER;
  }
});
Object.defineProperty(exports, "LocalSessionMemory", {
  enumerable: true,
  get: function () {
    return _utils.LocalSessionMemory;
  }
});
Object.defineProperty(exports, "LocalStorageMemory", {
  enumerable: true,
  get: function () {
    return _utils.LocalStorageMemory;
  }
});
Object.defineProperty(exports, "Manager", {
  enumerable: true,
  get: function () {
    return _utils.Manager;
  }
});
Object.defineProperty(exports, "On", {
  enumerable: true,
  get: function () {
    return _modifier.On;
  }
});
Object.defineProperty(exports, "QueryString", {
  enumerable: true,
  get: function () {
    return _utils.QueryString;
  }
});
Object.defineProperty(exports, "Safir", {
  enumerable: true,
  get: function () {
    return _root.Safir;
  }
});
Object.defineProperty(exports, "T", {
  enumerable: true,
  get: function () {
    return _root.T;
  }
});
Object.defineProperty(exports, "byID", {
  enumerable: true,
  get: function () {
    return _utils.byID;
  }
});
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _root.getComp;
  }
});
var _root = require("./src/core/root");
var _comp = require("./src/core/comp");
var _modifier = require("./src/core/modifier");
var _utils = require("./src/core/utils");

},{"./src/core/comp":6,"./src/core/modifier":8,"./src/core/root":9,"./src/core/utils":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = void 0;
var _utils = require("./utils");
let testKeys = ['id', 'domRoot', 'text', 'rootStyle', 'subComponents', 'ready', 'onClick', 'propsMemLevel', 'renderId', 'render', 'update', 'changeTheme', 'onChange', 'clickBind', 'keyDownBind', 'keyUpBind'];
class BaseComponent {
  id = 'none';
  domRoot = null;
  rootStyle = {};
  subComponents = [];
  constructor(arg) {
    setTimeout(() => {
      this.checkProps(arg);
    }, 1);
    // this.checkProps(arg);
  }

  checkProps(arg) {
    // i not sure but for now it is good.
    // console.log('Test Base comp [arg]: ', arg)
    for (let key in this) {
      if (testKeys.indexOf(key) === -1) {
        // console.info('Checking for props: ', key, ' for id:', this.id);
        this.getPropById(key);
      }
    }
  }
  ready() {
    console.log(`${this.id} is ready.`);
  }
  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      console.info('Arg is string!');
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
      // console.warn('Arg is object! this.id  ', arg.id );
      this.id = arg.id;
      this.text = arg.text || '';
      this.type = arg.type;
      this.value = arg.value || '';
    }
    if (rootStyle) {
      this.rootStyle = rootStyle;
    } else {
      this.rootStyle = "";
    }

    // setTimeout(() => {this.ready();}, 1)
    this.ready();
  }
  set(arg, newValue, extraData) {
    // const local = 'data-' + arg;
    // console.log('test id ', this.id);
    // const localRoot = getComp(this.id);
    // // Double care!
    // localRoot.setAttribute(local, newValue);
    // localStorage.setItem(arg, newValue);
    let root = this;
    root[arg] = newValue;
    this.update(root, arg, extraData);
  }
  setPropById(id, nv, level) {
    // id from parent and id is props key/name
    let name = this.id + '-' + id;
    if (typeof level == 'undefined') {
      let level = 0;
    }
    if (level == 0) {
      // Do nothing
    } else if (level == 1 || level == 'session') {
      // save it in session storage
      _utils.LocalSessionMemory.save(name, nv);
    } else if (level == 2 || level == 'local') {
      _utils.LocalStorageMemory.save(name, nv);
    }
    // No need to have DOM ID reference 
    if ((0, _utils.getComp)(id)) (0, _utils.getComp)(id).innerText = nv;
    if (typeof this[id] !== 'undefined') {
      this[id] = nv;
    }
  }
  getPropById(id) {
    let name = this.id + '-' + id;
    let testSessionLevel = _utils.LocalSessionMemory.load(name);
    if (testSessionLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if ((0, _utils.getComp)(id)) {
        console.log(`%c Safir found dom element with id='${id}' innerText='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
        (0, _utils.getComp)(id).innerText = testSessionLevel;
      }
      if ((0, _utils.getComp)(this.id + '-' + id)) {
        if ((0, _utils.getComp)(name).localName == 'input' || (0, _utils.getComp)(name).nodeName == 'INPUT') {
          console.log(`%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testSessionLevel;
        } else {
          console.log(`%c Safir found tag <${(0, _utils.getComp)(name).localName} id='${this.id} + '-' +  ${id}' value='${testSessionLevel}' > . %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testSessionLevel;
        }
      }
      if (typeof this[id] !== 'undefined' && this[id] != testSessionLevel) {
        this[id] = testSessionLevel;
        console.log(`%c Safir set class prop this.${this[id]} vs ${testSessionLevel} %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
      }
    }
    let testLocalLevel = _utils.LocalStorageMemory.load(name);
    if (testLocalLevel !== false) {
      // no need to exist always REF DOM BY ID.
      if ((0, _utils.getComp)(id)) {
        console.log(`%c Safir found dom element with id='${id}' innerText='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
        (0, _utils.getComp)(id).innerText = testLocalLevel;
      }
      if ((0, _utils.getComp)(this.id + '-' + id)) {
        if ((0, _utils.getComp)(name).localName == 'input' || (0, _utils.getComp)(name).nodeName == 'INPUT') {
          console.log(`%c Safir found input <input id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testLocalLevel;
        } else {
          console.log(`%c Safir found tag <${(0, _utils.getComp)(name).localName} id='${this.id} + '-' +  ${id}' value='${testLocalLevel}' > . %c ✔ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
          (0, _utils.getComp)(this.id + '-' + id).value = testLocalLevel;
        }
      }
      if (typeof this[id] !== 'undefined' && this[id] != testLocalLevel) {
        this[id] = testLocalLevel;
        console.log(`%c Safir set class prop this.${this[id]} vs ${testLocalLevel} %c ☑ [storage-props]`, _utils.colorLog1, _utils.colorLog2);
      }
    }
  }
  renderId = () => `
    <div id="${this.id}" class="${this.rootStyle}">
      ${this.render()}
    </div>
  `;
  render = () => ``;
  update = (root, arg, extraData) => {
    (0, _utils.getComp)(root.id).innerHTML = this.render();
    if (extraData?.emit === false) {
      console.info("Update Comp:", this.id);
      return;
    }
    // Emiter
    dispatchEvent(new CustomEvent('on-' + arg, {
      bubbles: true,
      detail: {
        emitter: root.id,
        arg: arg,
        newValue: root[arg]
      }
    }));
    console.info("Update/Emited Comp:", this.id);
  };
  changeTheme = newTheme => {
    if (newTheme) {
      if ((0, _utils.getComp)('app')?.classList.contains(newTheme)) {
        console.info('already containe theme!');
      } else {
        (0, _utils.getComp)('app')?.classList.remove('theme-light');
        (0, _utils.getComp)('app')?.classList.remove('theme-dark');
        (0, _utils.getComp)('app')?.classList.add(newTheme);
      }
    } else {
      if ((0, _utils.getComp)('app')?.classList.contains('theme-light')) {
        console.info('Change theme !');
        (0, _utils.getComp)('app')?.classList.remove('theme-light');
        (0, _utils.getComp)('app')?.classList.add('theme-dark');
      } else if ((0, _utils.getComp)('app')?.classList.contains('theme-dark')) {
        console.info('Change theme !');
        (0, _utils.getComp)('app')?.classList.remove('theme-dark');
        (0, _utils.getComp)('app')?.classList.add('theme-light');
      }
    }
  };
  clickBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'clickBind',
        for: a,
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
  keyDownBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
  keyUpBind = a => {
    let onClickEvent = new CustomEvent(a, {
      bubbles: true,
      detail: {
        info: 'keyDownBind',
        for: a,
        target: this,
        value: this.value
      }
    });
    dispatchEvent(onClickEvent);
  };
}
exports.BaseComponent = BaseComponent;

},{"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vertical = exports.Horizontal = exports.Base = void 0;
var _base = require("../style/base");
class Base extends HTMLElement {
  constructor(...args) {
    super(...args);
    console.log('Base class init... arg => ', args);
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    let inputElement = document.createElement('div');
    inputElement.setAttribute('id', this.getAttribute('id'));
    inputElement.innerHTML = this.innerHTML;
    // inputElement.setAttribute('type', this.getAttribute('type')!);
    // inputElement.setAttribute('value', this.getAttribute('value')!);
    // inputElement.setAttribute('max', this.getAttribute('max')!);
    // inputElement.setAttribute('min', this.getAttribute('min')!);
    // need trick
    // inputElement.setAttribute('class', this.getAttribute('class'));
    // predefined
    inputElement.setAttribute('style', args[0]);
    // inputElement.classList.add(args[0]);

    console.log('inputElement.classList =? ', inputElement.classList);
    // if (this.getAttribute('style') !== null) inputElement.setAttribute('style', this.getAttribute('style')!);

    inputElement.addEventListener('mousemove', () => {
      // console.log('hover on element.', this.getAttribute('id'));
    });

    // inputElement.addEventListener('change', (e) => {
    //   console.log('changed', (e ).path[0].value);
    //   this.setAttribute('value', (e ).path[0].value)
    // });
    // if (typeof args[0] === 'function') inputElement.addEventListener('change', args[0])
    shadowRoot.appendChild(inputElement);
  }
}
exports.Base = Base;
class Vertical extends Base {
  constructor(...args) {
    // console.log('C Ver class init... arg => ', args);
    args.push(_base.verCenter);
    super(...args);
  }
}
exports.Vertical = Vertical;
class Horizontal extends Base {
  constructor(...args) {
    // console.log('C Hor class init... arg => ', args);
    args.push(_base.horCenter);
    super(...args);
  }
}
exports.Horizontal = Horizontal;

},{"../style/base":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.On = void 0;
window.On = window.addEventListener;
const On = window.On;
exports.On = On;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T = exports.Safir = void 0;
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _utils.getComp;
  }
});
var _customCom = require("./custom-com");
var _utils = require("./utils");
var _modifier = require("./modifier");
/**
 * @description
 * Main safir classes.
 * Test project structure.
 */

let T = {};

/**
 * @description
 * Main Base Safir class.
 */
exports.T = T;
class BaseSafir {
  /**
   * @description
   * Multi language system is already deep integrated like common feature
   * in developing apps proccess.
   */
  emitML = async function (r) {
    const x = await r.loadMultilang();
    // Internal exspose to the global obj
    exports.T = T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    // console.info("Multilang integrated component... ");
    try {
      const r = await fetch(path, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await r.json();
    } catch (err) {
      console.warn('Not possible to access multilang json asset! Err => ', err);
      return {};
    }
  };
}
class Safir extends BaseSafir {
  subComponents;
  appRoot;
  constructor() {
    super();
    this.subComponents = [];
    this.appRoot = (0, _utils.getComp)("app");
    this.construct();
  }
  ready = () => {
    console.log(`%c App root component is ready ♻. %c 🤘 [safir rocks]`, _utils.colorLog1, _utils.colorLog2);
  };
  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    // console.info("Multilang integrated component.ROOT. Still not resolved (pass arg) for services eg. codepen etc.");
    window.customElements.define('ver-box', _customCom.Vertical);
    window.customElements.define('hor-box', _customCom.Horizontal);
    // console.info("Custom Base Dom elements integrated => [Vertical, Horizontal].");
    this.ready();
  };
  regTag(tagName, classRef) {
    window.customElements.define(tagName, classRef);
    console.info("Custom dom element loaded in runtime => " + tagName);
  }
  loadComponent = (arg, rootStyle) => {
    let x = document.createElement('div');
    x.setAttribute("id", arg.id);
    // if (rootStyle) x.setAttribute("style", rootStyle);
    if (rootStyle) x.classList.add(rootStyle);
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    arg.ready();
    return arg;
  };
  loadVanillaComp(arg) {
    fetch(arg, {}).then(res => {
      return res.text();
    }).then(html => {
      let test2 = html.split('<script>')[1];
      let htmlContent = html.split('<script>')[0];
      let myScriptContent = test2.split('</script>')[0];
      let myScript = document.createElement('script');
      myScript.innerHTML = myScriptContent;
      // document.body.innerHTML += htmlContent;
      this.appRoot.innerHTML += htmlContent;
      document.body.appendChild(myScript);
      return true;
    });
  }
}
exports.Safir = Safir;

},{"./custom-com":7,"./modifier":8,"./utils":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorLog2 = exports.colorLog1 = exports.byTag = exports.byID = exports.byClass = exports.QueryString = exports.Manager = exports.LocalStorageMemory = exports.LocalSessionMemory = exports.JSON_HEADER = void 0;
exports.degToRad = degToRad;
exports.getComp = void 0;
exports.isMobile = isMobile;
exports.loadImage = loadImage;
exports.radToDeg = radToDeg;
/**
 * @description
 * List of always usefull functions.
 * - Manager - Load script in runtime.
 * - degToRad/radToDeg
 * - getComp
 * - isMobile
 */
let Manager = {
  load: (src, id, type, parent, callback) => {
    var s = document.createElement("script");
    s.onload = function (e) {
      if (callback) callback(e);
      console.info("Script id loaded: " + src);
    };
    if (typeof type !== "undefined") {
      s.setAttribute("type", type);
      s.innerHTML = src;
    } else {
      s.setAttribute("src", src);
    }
    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }
    if (typeof parent !== "undefined") {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  },
  loadModule: (src, id, type, parent, callback) => {
    console.info("Async loader -> ", src);
    var s = document.createElement("script");
    s.onload = function (e) {
      if (callback) callback(e);
    };
    if (typeof type === "undefined") {
      s.setAttribute("type", "module");
      s.setAttribute("src", src);
    } else {
      s.setAttribute("type", type);
      s.innerHTML = src;
    }
    s.setAttribute("src", src);
    if (typeof id !== "undefined") {
      s.setAttribute("id", id);
    }
    if (typeof parent !== "undefined") {
      document.getElementById(parent).appendChild(s);
    } else {
      document.body.appendChild(s);
    }
  }
};
exports.Manager = Manager;
let QueryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();
exports.QueryString = QueryString;
const getComp = function (id) {
  return document.getElementById(id);
};
exports.getComp = getComp;
const byClass = function (id) {
  return document.getElementsByClassName(id);
};
exports.byClass = byClass;
const byTag = function (id) {
  return document.getElementsByTagName(id);
};
exports.byTag = byTag;
const byID = function (id) {
  return document.getElementById(id);
};
exports.byID = byID;
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
;
function radToDeg(r) {
  var pi = Math.PI;
  return r * (180 / pi);
}
function isMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}
function loadImage(url, onload) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;
  img.onload = function (e) {
    onload();
  };
  return img;
}
;

/**
 * LocalStorageMemory save and load js objects in localStorage.
 */
let LocalStorageMemory = {
  localStorage: window.localStorage,
  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of localstorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro localStorage.
   */
  save: function (name, obj) {
    try {
      return localStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalStorageMemory class , method save!");
      return false;
    }
  },
  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of localstorage key
   * @return {false | object} What ever we are stored intro localStorage.
   */
  load: function (name) {
    if (localStorage.getItem(name) === "undefined" || localStorage.getItem(name) == null || localStorage.getItem(name) === "") {
      // console.warn("LocalStorageMemory method load return's: ", localStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(localStorage.getItem(name));
    }
  }
};

/**
 * LocalSessionMemory save and load js objects in localStorage.
 */
exports.LocalStorageMemory = LocalStorageMemory;
let LocalSessionMemory = {
  sessionStorage: window.sessionStorage,
  /**
   * save  Put the object into storage.
   * @example Usage : save("MyObjectKey", myObject )
   * @method save
   * @param {String} Name Name of sessionStorage key
   * @param {object} Value Any object we can store.
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  save: function (name, obj) {
    try {
      return sessionStorage.setItem(name, JSON.stringify(obj));
    } catch (e) {
      console.log("Something wrong in LocalSessionMemory class , method save!");
      return false;
    }
  },
  /**
   * Load saved object from storage. Retrieve the object from storage or
   * return false.
   * @example Usage : var giveMeMyObject = load("MyObjectKey")
   * @function load
   * @param {String} Name Name of sessionStorage key
   * @return {false | object} What ever we are stored intro sessionStorage.
   */
  load: function (name) {
    if (sessionStorage.getItem(name) === "undefined" || sessionStorage.getItem(name) == null || sessionStorage.getItem(name) === "") {
      // console.warn("LocalSessionMemory method load return's: ", sessionStorage.getItem(name));
      return false;
    } else {
      return JSON.parse(sessionStorage.getItem(name));
    }
  }
};
exports.LocalSessionMemory = LocalSessionMemory;
const colorLog1 = "color: #66ffff; font-size:14px;text-shadow: 0px 0px 51px #111222, 1px 1px 1px #aaa66a;";
exports.colorLog1 = colorLog1;
const colorLog2 = "color: #ffff66; font-size:12px;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;";
exports.colorLog2 = colorLog2;
const JSON_HEADER = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
exports.JSON_HEADER = JSON_HEADER;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verCenter = exports.horCenter = void 0;
let verCenter = `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100%);
`;
exports.verCenter = verCenter;
let horCenter = `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100%);
`;
exports.horCenter = horCenter;

},{}]},{},[2]);
