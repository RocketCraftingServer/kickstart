(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "GetAllEvents", {
  enumerable: true,
  get: function () {
    return _modifier.GetAllEvents;
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
Object.defineProperty(exports, "Off", {
  enumerable: true,
  get: function () {
    return _modifier.Off;
  }
});
Object.defineProperty(exports, "On", {
  enumerable: true,
  get: function () {
    return _modifier.On;
  }
});
Object.defineProperty(exports, "Safir", {
  enumerable: true,
  get: function () {
    return _root.Safir;
  }
});
exports.SafirBuildInPlugins = void 0;
Object.defineProperty(exports, "T", {
  enumerable: true,
  get: function () {
    return _root.T;
  }
});
Object.defineProperty(exports, "byClass", {
  enumerable: true,
  get: function () {
    return _utils.byClass;
  }
});
Object.defineProperty(exports, "byID", {
  enumerable: true,
  get: function () {
    return _utils.byID;
  }
});
Object.defineProperty(exports, "byTag", {
  enumerable: true,
  get: function () {
    return _utils.byTag;
  }
});
Object.defineProperty(exports, "emit", {
  enumerable: true,
  get: function () {
    return _utils.emit;
  }
});
Object.defineProperty(exports, "getComp", {
  enumerable: true,
  get: function () {
    return _root.getComp;
  }
});
Object.defineProperty(exports, "urlVar", {
  enumerable: true,
  get: function () {
    return _utils.urlVar;
  }
});
var _root = require("./src/core/root");
var _comp = require("./src/core/comp");
var _modifier = require("./src/core/modifier");
var _utils = require("./src/core/utils");
var _safirSlot = require("./src/controls/safir-slot");
var _safirNotify = require("./src/controls/safir-notify");
let SafirBuildInPlugins = {
  SafirSlot: _safirSlot.SafirSlot,
  notify: _safirNotify.notify
};
exports.SafirBuildInPlugins = SafirBuildInPlugins;

},{"./src/controls/safir-notify":2,"./src/controls/safir-slot":3,"./src/core/comp":4,"./src/core/modifier":6,"./src/core/root":7,"./src/core/utils":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = void 0;
var _utils = require("../core/utils");
let notify = {
  root: () => (0, _utils.byID)('msgBox'),
  pContent: () => (0, _utils.byID)('not-content'),
  copy: function () {
    navigator.clipboard.writeText(notify.root().children[0].innerText);
  },
  c: 0,
  ic: 0,
  t: {},
  setContent: function (content, t) {
    var iMsg = document.createElement('div');
    iMsg.innerHTML = content;
    iMsg.id = `msgbox-loc-${notify.c}`;
    notify.root().appendChild(iMsg);
    iMsg.classList.add('animate1');
    if (t == 'ok') {
      iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
    } else {
      iMsg.style = 'font-family: stormfaze;color:white;padding:7px;margin:2px';
    }
  },
  kill: function () {
    notify.root().remove();
  },
  show: function (content, t) {
    notify.setContent(content, t);
    notify.root().style.display = "block";
    var loc2 = notify.c;
    setTimeout(function () {
      (0, _utils.byID)(`msgbox-loc-${loc2}`).classList.remove("fadeInDown");
      (0, _utils.byID)(`msgbox-loc-${loc2}`).classList.add("fadeOut");
      setTimeout(function () {
        (0, _utils.byID)(`msgbox-loc-${loc2}`).style.display = "none";
        (0, _utils.byID)(`msgbox-loc-${loc2}`).classList.remove("fadeOut");
        (0, _utils.byID)(`msgbox-loc-${loc2}`).remove();
        notify.ic++;
        if (notify.c == notify.ic) {
          notify.root().style.display = 'none';
        }
      }, 1000);
    }, 3000);
    notify.c++;
  },
  error: function (content) {
    notify.root().classList.remove("success");
    notify.root().classList.add("error");
    notify.root().classList.add("fadeInDown");
    notify.show(content, 'err');
  },
  success: function (content) {
    notify.root().classList.remove("error");
    notify.root().classList.add("success");
    notify.root().classList.add("fadeInDown");
    notify.show(content, 'ok');
  }
};
exports.notify = notify;

},{"../core/utils":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleCounter = exports.SafirSlot = void 0;
var _index = require("../../index");
class SingleCounter extends _index.BaseComponent {
  refFunc = [];
  ready = () => {
    this.id = this.id;
    let slot = document.createElement('div');
    slot.id = `${this.rootDom}slot${this.id}`;
    slot.classList.add('slot');
    (0, _index.byID)(this.rootDom + '-holder').append(slot);
    if (this.id.indexOf('D') != -1) {
      slot.innerHTML = ',';
      slot.style.margin = '1px';
      slot.style.padding = '1px';
      slot.style.fontSize = 'xxx-large';
      slot.style.background = 'transparent';
      return;
    }
    slot.innerHTML = this.render(this.id);
    this.myAnim(this.id);
  };
  constructor(arg) {
    super(arg);
    this.content = arg.content;
    if (this.content.length == 0) {
      this.content = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    this.initial(arg);
    this.rootDom = arg.rootDom;
  }
  calcAnim(ring) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    nums.forEach((num, i) => {
      this.refFunc.push(() => {
        const numAngle = 36 * i;
        const currentAngle = ring.style.getPropertyValue("--deg").replace(/\D/g, "");
        let nextAngle = numAngle;
        while (nextAngle < currentAngle) {
          nextAngle += 360;
        }
        if (nextAngle > 360) nextAngle -= 360;
        // console.log('nextAngle', nextAngle);
        ring.style.setProperty("--deg", `-${nextAngle}deg`);
        ring.setAttribute('data-slot', i);
      });
    });
  }
  myAnim = function (id) {
    const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
    const panels = $(`[data-root-${this.rootDom}-${id}]`);
    panels.forEach((panel, i) => {
      panel.style.setProperty("--angle", `${360 / panels.length * i}deg`);
    });
    const ring0 = $(`.ring-${this.rootDom}-${id}`)[0];
    this.calcAnim(ring0);
  };
  setNumber = function (num) {
    this.refFunc[num]();
  };
  render = arg => {
    return `
    <div class="ring-${this.rootDom}-${arg} ring${arg}" data-slot="0" data-root="${this.rootDom}">
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[0]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[1]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[2]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[3]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[4]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[5]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[6]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[7]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[8]}</div>
      <div class="panel${arg} ring${arg}" data-root-${this.rootDom}-${arg}="" >${this.content[9]}</div>
    </div>
    `;
  };
}
exports.SingleCounter = SingleCounter;
class SafirSlot extends _index.BaseComponent {
  VALUE = 0;
  speed = 100;
  editBtns = false;
  myConstruct(arg) {
    if (typeof arg.editBtns !== 'undefined') {
      this.editBtns = arg.editBtns;
    }
    if (typeof arg.content !== 'undefined') {
      this.content = arg.content;
    } else {
      this.content = [];
    }
    this.field0 = new SingleCounter({
      id: '0',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field1 = new SingleCounter({
      id: '1',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field2 = new SingleCounter({
      id: '2',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field3 = new SingleCounter({
      id: '3',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field4 = new SingleCounter({
      id: '4',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field5 = new SingleCounter({
      id: '5',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field6 = new SingleCounter({
      id: '6',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field7 = new SingleCounter({
      id: '7',
      rootDom: this.rootDom,
      content: this.content
    });
    this.dot = new SingleCounter({
      id: 'D',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field8 = new SingleCounter({
      id: '8',
      rootDom: this.rootDom,
      content: this.content
    });
    this.field9 = new SingleCounter({
      id: '9',
      rootDom: this.rootDom,
      content: this.content
    });
    (0, _index.On)(`${this.rootDom}-plus`, e => {
      this.setSum(this.getCurrentSum() + 1);
    });
    (0, _index.On)(`${this.rootDom}-minus`, e => {
      this.setSum(this.getCurrentSum() - 1);
    });

    // setTimeout(() => {
    //   dispatchEvent(new CustomEvent(`${this.rootDom}`, {
    //     bubbles: true,
    //     detail: {
    //       rootDom: this.rootDom,
    //     }
    //   }));
    // }, 1)
  }

  constructor(arg, classArg) {
    super();
    this.initial(arg, classArg);
    this.rootDom = arg.rootDom;
    this.myConstruct(arg);
  }
  setSlotClass(c) {
    let setByIndex = (i, c) => {
      let l0 = document.querySelectorAll(`[data-root-${this.rootDom.toLowerCase()}-${i}]`);
      for (var x = 0; x < l0.length; x++) {
        l0[x].classList.add(c);
      }
    };
    for (var x = 0; x < 10; x++) {
      setByIndex(x, c);
    }
    (0, _index.byID)(this.id).classList.add(c);
  }
  setSlotColor(c) {
    const setByIndex = (i, c) => {
      let l0 = document.querySelectorAll(`[data-root-${this.rootDom.toLowerCase()}-${i}]`);
      for (var x = 0; x < l0.length; x++) {
        l0[x].style.background = c;
      }
    };
    for (var x = 0; x < 10; x++) {
      setByIndex(x, c);
    }
    (0, _index.byID)(this.id).style.background = c;
  }
  setSum(num) {
    num = parseFloat(num.toFixed(2));
    var str = String(num);
    if (str.indexOf('.') == -1) {
      str = str + ".00";
    }
    if (str.indexOf('.') != -1) {
      // console.log('Theres decimals intro number str.length;', str.length);
      (0, _index.byID)(`${this.rootDom}slotD`).style.display = 'block';
      let delta = 0;
      if (str.length < 11) {
        let howMany = 11 - str.length;
        if (str.split('.')[1].length < 2) howMany--;
        for (var y = 0; y < howMany; y++) {
          str = "0" + str;
          if (str.split('.')[1].length < 2) {
            console.log('TEST STRRIGHT LINGTH = ', str.split('.')[1].length);
            str = str + "0";
            delta = -1;
          }
        }
      }
      var locHandler = false;
      for (var x = 10; x >= 0; x--) {
        if (str[x] != '.') {
          if (locHandler == true) {
            this[`field${x}`].setNumber(str[x]);
          } else {
            if (x == 11) {
              this[`field${x - 2}`].setNumber(str[x]);
            } else {
              this[`field${x - 1}`].setNumber(str[x]);
            }
          }
        } else {
          locHandler = true;
          // console.log('DECIMAL CHAR DETECTED ', str[x])
        }
      }
    }

    this.VALUE = str;
  }
  getCurrentSum() {
    return parseFloat(parseFloat(this.VALUE).toFixed(2));
  }
  getNumByPosition(n) {
    let C = (0, _index.byClass)(`ring-${this.rootDom}-${n}`);
    console.log('Get individual index value: ', C[x].getAttribute('data-slot'));
    return C[x].getAttribute('data-slot');
  }
  myX = 0;
  setByTime(newValue, speed) {
    if (typeof speed !== 'undefined') this.speed = speed;
    if (newValue.toString().indexOf('.') !== -1 && newValue.toString().split('.')[1].length < 2) {
      newValue = newValue + "0";
    }
    let test = parseFloat((newValue - this.getCurrentSum()).toFixed(2));
    let X = x => {
      var CO = 1;
      if (test < 0) {
        CO = -1;
      }
      if (CO == 1) {
        if (test < 0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO);
        } else if (test < 1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO);
        } else if (test < 100) {
          this.setSum(this.getCurrentSum() + 1.12 * CO);
        } else if (test < 500) {
          this.setSum(this.getCurrentSum() + 50.12 * CO);
        } else {
          this.setSum(this.getCurrentSum() + 200.12 * CO);
        }
      } else {
        if (test > -0.5) {
          this.setSum(this.getCurrentSum() + 0.01 * CO);
        } else if (test > -1) {
          this.setSum(this.getCurrentSum() + 0.10 * CO);
        } else if (test > -100) {
          this.setSum(this.getCurrentSum() + 2.12 * CO);
        } else if (test > -500) {
          this.setSum(this.getCurrentSum() + 112.12 * CO);
        } else {
          this.setSum(this.getCurrentSum() + 212.12 * CO);
        }
      }
    };
    if (this.getCurrentSum() < newValue && test > 0) {
      this.myX++;
      setTimeout(x => {
        X(x);
        this.setByTime(newValue);
      }, this.speed, this.myX);
    } else if (this.getCurrentSum() > newValue && test < 0) {
      this.myX++;
      setTimeout(x => {
        X(x);
        this.setByTime(newValue);
      }, this.speed, this.myX);
    }
  }
  inc = this.clickBind;
  render = () => {
    return `
      <h2 data-label="${this.rootDom}SlotTitle">Safir-Slot-UI-Component</h2>
      <div id="${this.rootDom}-holder" class="horCenter numAnimHolder" style="background-color:transparent"></div>
      ${this.editBtns == true ? `<button id="${this.rootDom}-minus" onclick="(${this.inc})('${this.rootDom + "-minus"}')" >-</button>
         <button id="${this.rootDom}-plus" onclick="(${this.inc})('${this.rootDom + "-plus"}')" >+</button>` : ""}
    `;
  };
}
exports.SafirSlot = SafirSlot;

},{"../../index":1}],4:[function(require,module,exports){
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
  }
  checkProps(arg) {
    for (let key in this) {
      if (testKeys.indexOf(key) === -1) {
        this.getPropById(key);
      }
    }
    this.ready();
  }
  ready() {
    console.log(`${this.id} is ready.`);
  }
  initial(arg, rootStyle) {
    if (typeof arg === 'string') {
      // console.info('Arg is string!');
      this.text = arg;
      this.id = arg;
    } else if (typeof arg === 'object') {
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
  }
  set(arg, newValue, extraData) {
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
    // console.log(
    //   `%c Safir TEST id='${id}' '${name}' > . %c ☑ [any-props]`,
    //   colorLog1, colorLog2
    // );

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
        console.log(`%c Safir set class prop ${id}  ${this[id]} vs ${testSessionLevel} %c ☑ [session-props]`, _utils.colorLog1, _utils.colorLog2);
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
        console.info('already new theme!');
        (0, _utils.getComp)('app').classList = 'app fill';
        (0, _utils.getComp)('app')?.classList.add(newTheme);
      }
    } else {
      if (!(0, _utils.getComp)('app')?.classList.contains('theme-light') && !(0, _utils.getComp)('app')?.classList.contains('theme-dark')) {
        (0, _utils.getComp)('app').classList = 'app fill';
        (0, _utils.getComp)('app')?.classList.add('theme-dark');
        return;
      }
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

},{"./utils":8}],5:[function(require,module,exports){
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

},{"../style/base":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.On = exports.Off = exports.GetAllEvents = void 0;
window.On = window.addEventListener;
window.Off = window.removeEventListener;
window.GetAllEvents = [];
const On = window.On;
exports.On = On;
const Off = window.Off;
exports.Off = Off;
const GetAllEvents = window.GetAllEvents;
exports.GetAllEvents = GetAllEvents;

},{}],7:[function(require,module,exports){
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

  T = {};
  emitML = async (r, path) => {
    let x = null;
    if (path) {
      x = await r.loadMultilang(path);
    } else {
      x = await r.loadMultilang();
    }

    // Internal exspose to the global obj
    this.T = x;
    exports.T = T = x;
    dispatchEvent(new CustomEvent('app.ready', {
      detail: {
        info: 'app.ready'
      }
    }));
  };
  translate = {
    update: function () {
      var allTranDoms = document.querySelectorAll('[data-label]');
      console.log(allTranDoms);
      allTranDoms.forEach(i => {
        i.innerHTML = T[i.getAttribute('data-label')];
      });
    }
  };
  loadMultilang = async function (path = 'assets/multilang/en.json') {
    console.info("Multilang: ", path);
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
    this.listeners = [];
    this.subComponents = [];
    this.appRoot = (0, _utils.getComp)("app");
    this.construct();
    return this;
  }
  ready = () => {
    console.log(`%c App root component is ready ♻. %c 🤘 [safir rocks]`, _utils.colorLog1, _utils.colorLog2);
  };
  construct = () => {
    // Translation Enabled.
    this.emitML(this);
    console.info("Multilang integrated wwith component root.");
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
    if (rootStyle && rootStyle.indexOf(' ') !== -1) {
      let classes = rootStyle.split(' ');
      classes.forEach(c => {
        if (rootStyle) x.classList.add(c);
      });
    } else {
      if (rootStyle) x.classList.add(rootStyle);
    }
    this.appRoot?.append(x);
    x.innerHTML = arg.render(arg);
    this.subComponents.push(arg);
    // arg.ready();
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

},{"./custom-com":5,"./modifier":6,"./utils":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorLog2 = exports.colorLog1 = exports.byTag = exports.byID = exports.byClass = exports.Manager = exports.LocalStorageMemory = exports.LocalSessionMemory = exports.JSON_HEADER = void 0;
exports.degToRad = degToRad;
exports.getComp = exports.emit = void 0;
exports.isMobile = isMobile;
exports.loadImage = loadImage;
exports.radToDeg = radToDeg;
exports.urlVar = void 0;
/**
 * Top priory!
 */
let listeners = [];
const oDoc = window.addEventListener;
window.addEventListener = function (type, listener, options) {
  listeners.push({
    element: this,
    type,
    listener,
    options
  });
  if (typeof app.listeners !== 'undefined' && app.listeners.length == 0) {
    console.log('app.listeners once');
    app.listeners = listeners;
  }
  return oDoc.call(this, type, listener, options);
};

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
let urlVar = function () {
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
exports.urlVar = urlVar;
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
const emit = (en, d) => {
  if (typeof d == 'undefined') d = {};
  let e = new CustomEvent(en, {
    detail: d
  });
  dispatchEvent(e);
};
exports.emit = emit;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
var _agl = require("../direct-render/agl");
class ActiveGames extends _safir.BaseComponent {
  id = '';
  text = '';
  items = [];
  ready = () => {};
  preventor1 = false;
  preventor2 = false;
  funcWP = () => {
    if (this.preventor1 == false) {
      this.preventor1 = true;
      this.runApiWannaPlay();
      setTimeout(() => {
        this.preventor1 = false;
      }, 2000);
    }
  };
  funcDWP = () => {
    if (this.preventor2 == false) {
      this.preventor2 = true;
      this.runApiRemoveMeFromList();
      setTimeout(() => {
        this.preventor2 = false;
      }, 2000);
    }
  };
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.currentPagIndex = 1;
    this.apiDomain = sessionStorage.getItem('domain');
    var t = app.listeners.filter(__ => __.type == 'WannaPlay');
    if (t.length == 0) {
      On('WannaPlay', this.funcWP);
      On('End', this.funcDWP);
    }
  }
  onChange = this.keyUpBind;
  onClick = this.clickBind;
  onWannaPlay = this.clickBind;
  onEnd = this.clickBind;
  async runApiRemoveMeFromList() {
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token')
    };
    const rawResponse = await fetch(route + '/rocket/remove-from-server-list', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    // this.setData(response);
    app.subComponents[0].gotoAGL.onClick('gotoAGL');
  }
  async runApiWannaPlay() {
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token'),
      mapName: (0, _safir.byID)('activeGamesList-map-name').value == '' ? 'level1' : (0, _safir.byID)('activeGamesList-map-name').value,
      gameName: (0, _safir.byID)('activeGamesList-game-name').value == '' ? 'platformer' : (0, _safir.byID)('activeGamesList-game-name').value,
      gameHostAlias: (0, _safir.byID)('activeGamesList-host').value == '' ? 'maximumroulette.com' : (0, _safir.byID)('activeGamesList-host').value
    };
    const rawResponse = await fetch(route + '/rocket/wanna-play', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.setData(response);
    setTimeout(() => {
      app.subComponents[0].gotoAGL.onClick('gotoAGL');
    }, 2000);
  }
  setData = res => {
    (0, _safir.byID)('activegamesResponse').innerHTML = '<div id="AGL-content" ></div>';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        let colorFlag = true;
        for (let key1 in res[key]) {
          let prepare = [];
          for (let key2 in res[key][key1]) {
            if (key2 == 'sessionHostIp') {
              console.log('sessionHostIp active games => ', res[key][key1][key2]);
              prepare.push({
                key: key2,
                value: res[key][key1][key2].split('.')[0] + ".*.*.*"
              });
            } else {
              prepare.push({
                key: key2,
                value: res[key][key1][key2]
              });
            }
          }
          (0, _safir.byID)('AGL-content').innerHTML += (0, _agl.activeGamesListRender)(prepare, colorFlag);
          colorFlag = !colorFlag;
        }
      } else {
        if (key == 'message') {
          console.info("activegamesResponse:", res[key]);
          (0, _safir.byID)('activegamesResponse').innerHTML += `<div style='color:${color};margin-bottom:10px;' >${key} : ${res[key]} 👨‍🚀</div>`;
        } else if (res[key]) {
          (0, _safir.byID)('activegamesResponse').innerHTML += `<div style='color:${color};margin-bottom:10px;' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
    // new test
    var locCollectItems = [];
    for (var x = 0; x < (0, _safir.byID)('activegamesResponse').children.length; x++) {
      for (var y = 0; y < (0, _safir.byID)('activegamesResponse').children[x].children.length; y++) {
        locCollectItems.push((0, _safir.byID)('activegamesResponse').children[x].children[y]);
      }
    }
    ;
    locCollectItems.forEach((item, index) => {
      setTimeout(function () {
        locCollectItems[index].classList.add('animate-bounce1');
      }, 50 * index);
    });
  };
  render = () => `
    <h4>Active games list - It is information about your any game multiplayer info to make possibility other to find you and play with others</h4>
    <h4>Ussualy you need two type of data. Game name and ip of server host.</h4>
    <h3 style="color:orange" >Add my opened host multiplayer info </h3>
    <div style="display:flex">
      <p><span style="width:30%">Game Name: </span><input id='${this.id}-game-name' type='text' class="w30" value="platformer" /></p>
      <p><span style="width:30%">Hosted on: </span><input id='${this.id}-host' type='text' class="w30" value="maximumroulette.com" /></p>
      <p><span style="width:30%">Map name: </span><input id='${this.id}-map-name' type='text' class="w30" value="level1" /></p>
    </div>
    <button onclick="(${this.onWannaPlay})('WannaPlay')" >Add my game host info:</button>
    <button onclick="(${this.onEnd})('End')" >Remove me from list</button>
    <div id="activegamesResponse" class="animate-born myScroll overflowAuto">
      <div id="AGL-content" ></div>
    </div>
    <div id="activegamesPaginator" class="middle myPaddingList">
  `;
}
exports.default = ActiveGames;

},{"../direct-render/agl":15,"safir":1}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
class GameCard extends _safir.BaseComponent {
  id = '';
  text = '';
  ready = () => {
    if (this.args.label) {
      console.log('ml:', (0, _safir.byID)(this.id + '-real').setAttribute('data-label', this.args.label));
    }
  };
  setDisabled = () => {
    (0, _safir.byID)(this.id).disabled = true;
  };
  removeDisabled = () => {
    (0, _safir.byID)(this.id).disabled = false;
  };
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.args = arg;
  }
  onClick = this.clickBind;
  render = () => `
    <div class="game-card" style="display:flex;background-image:url(${this.args.poster});    background-size: cover;">
      <button id="${this.id}-real" 
              style="" 
              class="cardBtn fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
        ${this.text}
      </button>
    </div>
  `;
}
exports.default = GameCard;

},{"safir":1}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
var _gameCard = _interopRequireDefault(require("../components/gameCard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Home extends _safir.BaseComponent {
  id = '';
  btns = [];
  constructGameList() {
    this.links.forEach(e => {
      this.btns.push(new _gameCard.default({
        text: e.name,
        id: e.action,
        poster: e.poster
      }, 'game-card'));
      (0, _safir.On)(e.action, () => {
        this.loadGamplay(e.link);
      });
    });
  }
  ready = () => {
    this.constructGameList();
  };
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.links = [{
      description: "Nidzica",
      action: "platformer",
      poster: "./assets/imgs/platformer-visual-ts.png",
      name: "Nidzica",
      link: 'https://maximumroulette.com/apps/visual-ts/singleplayer/app.html'
    }, {
      description: "",
      action: 'platformer-multiplayer',
      poster: "./assets/imgs/platformer-visual-ts.png",
      name: "Multiplayer platformer",
      link: 'https://maximumroulette.com/apps/visual-ts/multiplayer/app.html'
    }, {
      description: "",
      action: 'platformer-video-chat',
      poster: "./assets/imgs/platformer-visual-ts.png",
      name: "Platformer Video Chat",
      link: 'https://maximumroulette.com/apps/visual-ts/basket-ball-chat/app.html'
    }, {
      description: "",
      action: 'hang3d',
      poster: "./assets/imgs/hang3d.png",
      name: "Hang3d Nightmare",
      link: 'https://maximumroulette.com/apps/hang3d/'
    }, {
      description: "",
      action: 'magic-three',
      poster: "./assets/imgs/platformer-visual-ts.png",
      name: "Magic three project",
      link: 'https://maximumroulette.com/apps/magic/public/module.html'
    }, {
      description: "",
      action: 'ultimate-roulette',
      poster: "./assets/imgs/ultimate-roulette.png",
      name: "Real Physics Roulette",
      link: 'https://roulette.maximumroulette.com'
    },
    // 
    {
      description: "",
      action: '3dJamb-6Dices',
      poster: "./assets/imgs/hang3d-reborn.png",
      name: "3d Jamb deluxe",
      link: 'https://maximumroulette.com/apps/webgpu/index.html'
    }];
    (0, _safir.On)('pointsPlus10', () => {
      console.log('POINTS PLUS');
      this.runApiPointsPlus10();
    });
  }
  accessGamplay(i) {
    // for now single tag object
    var t = (0, _safir.byTag)("object")[i];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument);
  }
  loadGamplay(i) {
    var t = (0, _safir.byTag)("iframe")[0];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument);
    t.src = i;
    (0, _safir.byID)('GameList').style.display = 'none';
    (0, _safir.byID)('gameplayDiv').style.display = 'flex';
  }
  exploreResponse(res) {
    console.log('TEST POINTS res', res);
    (0, _safir.byID)('testResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        for (let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          console.log("TEST 2 ", key1);
          if (key1 != 'token') {
            (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
          } else {
            console.log("ELSE 2 ", key1);
          }
        }
      } else {
        if (key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          (0, _safir.byID)('testResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          return;
        }
        if (res[key]) {
          (0, _safir.byID)('testResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} </div>`;
        }
      }
    }
  }
  async runApiPointsPlus10() {
    // must be fixed this.email at this moment
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token')
    };
    console.log(this.apiDomain);
    const rawResponse = await fetch(route + '/rocket/point-plus10', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    }).catch(() => {
      console.log('err in plus points');
    });
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }
  pointsPlus10 = this.clickBind;
  render = () => `
    <div id="homePage" class="animate-born myScroll verCenter overflowAuto">
    <div id="GameList" class="middle gameLists" style="display: flex;">
      ${this.btns.map(i => `${i.renderId()}`).join('')}
    </div>
      <div id="gameplayDiv" class="gameplayObj middle" style="display: none;">
        <span>RocketCraftingServer Platform Play Free Games </span>
        <iframe id="gameplay" class="gameplay" src="${this.links[0]}" allow="camera; microphone" />
        <br>
        <button onclick="(${this.pointsPlus10})('pointsPlus10')" >TEST POINTS REST/API</button>
        <div id="testResponse" style="text-align: center;"></div>
      </div>
    </div>
  `;
}
exports.default = Home;

},{"../components/gameCard":11,"safir":1}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
var _leaderboard = require("../direct-render/leaderboard");
class LeaderBoard extends _safir.BaseComponent {
  id = '';
  text = '';
  items = [];
  ready = () => {
    var t = app.listeners.filter(__ => __.type == 'nextClick');
    if (t.length == 0) {
      On('nextClick', this.next);
      On('prevClick', () => {
        if (this.currentPagIndex > 1) {
          this.currentPagIndex--;
          this.setPropById('currentPagIndex', this.currentPagIndex, 1);
          (0, _safir.emit)('pagPrev');
        }
      });
    }
  };
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.currentPagIndex = 1;
    console.log('TEST CALL CLICK constructor');
  }
  next = () => {
    console.log('TEST CALL CLICK 11111');
    this.currentPagIndex++;
    this.setPropById('currentPagIndex', this.currentPagIndex, 1);
    (0, _safir.emit)('pagNext');
  };
  onNext = this.clickBind;
  onPrev = this.clickBind;
  setData = res => {
    (0, _safir.byID)('leaderBoardResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        let colorFlag = true;
        for (let key1 in res[key]) {
          let prepare = [];
          for (let key2 in res[key][key1]) {
            prepare.push({
              key: key2,
              value: res[key][key1][key2]
            });
          }
          (0, _safir.byID)('leaderBoardResponse').innerHTML += (0, _leaderboard.LeaderBoardRender)(prepare, colorFlag);
          colorFlag = !colorFlag;
        }
      } else {
        if (key == 'message') {
          console.info("Leaderboard:", res[key]);
        } else if (res[key]) {
          (0, _safir.byID)('leaderBoardResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }

    // new test
    var locCollectItems = [];
    for (var x = 0; x < (0, _safir.byID)('leaderBoardResponse').children.length; x++) {
      for (var y = 0; y < (0, _safir.byID)('leaderBoardResponse').children[x].children.length; y++) {
        locCollectItems.push((0, _safir.byID)('leaderBoardResponse').children[x].children[y]);
      }
    }
    ;
    locCollectItems.forEach((item, index) => {
      setTimeout(function () {
        locCollectItems[index].classList.add('animate-bounce1');
      }, 50 * index);
    });
  };
  render = () => `
    <div id="leaderBoardResponse" class="animate-born myScroll verCenter overflowAuto"></div>
    <div id="leaderBoardPaginator" class="middle myPaddingList">
      <button onclick="(${this.onPrev})('prevClick')" >PREV</button>
      <span id="currentPagIndex"></span>
      <button onclick="(${this.onNext})('nextClick')" >NEXT</button>
    </div>
  `;
}
exports.default = LeaderBoard;

},{"../direct-render/leaderboard":17,"safir":1}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
class SimpleBtn extends _safir.BaseComponent {
  id = '';
  text = '';
  ready = () => {
    if (this.args.label) {
      console.log('ml:', (0, _safir.byID)(this.id + '-real').setAttribute('data-label', this.args.label));
    }
  };
  setDisabled = () => {
    (0, _safir.byID)(this.id).disabled = true;
  };
  removeDisabled = () => {
    (0, _safir.byID)(this.id).disabled = false;
  };
  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.args = arg;
  }
  onClick = this.clickBind;
  render = () => `
    <button id="${this.id}-real" class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
exports.default = SimpleBtn;

},{"safir":1}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activeGamesListRender = void 0;
let activeGamesListRender = (arg, colorFlag) => `
  <div class="horCenter h5 myMarginList AGL" 
       style="background-color:${colorFlag == true ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}">
    ${arg.map((item, index) => `<div
         style="${item.key == '_id' ? 'display:none' : ""}"
         class="${index % 2 == 0 ? 'tableStyleMark0' : 'tableStyleMark1'}">
           ${item.key} : ${item.value}
          </div>`).join('')}
  </div>
`;
exports.activeGamesListRender = activeGamesListRender;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
let Avatar = arg => {
  // alert(arg.res[arg.key][arg.key1])
  let src = arg.res[arg.key][arg.key1].replace('public', '');
  // arg.res[arg.key][arg.key1].replace('public', '');
  return `
  <img class="avatarProfile" alt="${arg.key1}" src="${arg.apiDomain}:2020/${src}"/>
`;
};
exports.Avatar = Avatar;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeaderBoardRender = void 0;
let LeaderBoardRender = (arg, colorFlag) => `
  <div class="horCenter h5 myMarginList" 
       style="background-color:${colorFlag == true ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}">
    ${arg.map((item, index) => `<div onclick=" navigator.clipboard.writeText(this.innerHTML);"
         class="${index % 2 == 0 ? 'tableStyleMark0' : 'tableStyleMark1'}">
           ${item.key} : ${item.value}
          </div>`).join('')}
  </div>
`;
exports.LeaderBoardRender = LeaderBoardRender;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _simpleBtn = _interopRequireDefault(require("../components/simple-btn"));
var _safir = require("safir");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MyHeader extends _safir.BaseComponent {
  id = 'my-heder';
  gotoLeaderboardBtn = new _simpleBtn.default({
    text: _safir.T.gotoLeaderboard,
    id: 'gotoLeaderboard'
  }, 'fill');
  gotoGamesPage = new _simpleBtn.default({
    text: 'Games',
    id: 'gotoGames'
  }, 'fill');
  gotoAccount = new _simpleBtn.default({
    text: 'Account',
    id: 'gotoAccount'
  }, 'fill');
  gotoAGL = new _simpleBtn.default({
    text: 'AGL',
    id: 'gotoAGL'
  }, 'fill');
  constructor(arg) {
    super(arg);
    this.initial(arg);
    this.themes = ['dark', 'light', 'orange', 'blue'];
    this.curTheme = 0;
    (0, _safir.On)('change-theme', () => {
      this.changeTheme('theme-' + this.themes[this.curTheme]);
      if (this.curTheme >= this.themes.length) {
        this.curTheme = 0;
      } else {
        this.curTheme++;
      }
      console.info('Trigger ChangeTheme integrated.');
    });
  }
  ready = () => {};
  change = this.clickBind;
  render = () => `
    <div class="middle h5">
       <div class="heder">
          <button class="fill" onclick="(${this.change})('change-theme')" data-label="changeTheme" ></button>
          ${this.gotoLeaderboardBtn.renderId()}
          ${this.gotoAccount.renderId()}
          ${this.gotoGamesPage.renderId()}
          ${this.gotoAGL.renderId()}
       </div>
    </div>
  `;
}
exports.default = MyHeader;

},{"../components/simple-btn":14,"safir":1}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _safir = require("safir");
var _simpleBtn = _interopRequireDefault(require("../components/simple-btn"));
var _imageProfile = require("../direct-render/imageProfile");
var _leaderboard = _interopRequireDefault(require("../components/leaderboard"));
var _home = _interopRequireDefault(require("../components/home"));
var _activegames = _interopRequireDefault(require("../components/activegames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RocketCraftingLayout extends _safir.BaseComponent {
  id = 'my-body';
  apiDomain = '';
  loginBtn = new _simpleBtn.default({
    label: 'loginBtn',
    id: 'loginBtn'
  }, 'w30 h5');
  registerBtn = new _simpleBtn.default({
    label: 'registerBtn',
    id: 'registerBtn'
  }, 'w30 h5');
  signoutBtn = new _simpleBtn.default({
    text: 'Sign Out',
    id: 'signoutBtn'
  }, 'w100px h5');
  forgotBtn = new _simpleBtn.default({
    text: 'Forgot password',
    id: 'forgotBtn'
  }, 'w30 h5');
  forgotAskBtn = new _simpleBtn.default({
    text: 'Ask for new password',
    id: 'forgotAskBtn'
  }, 'w30 h5');
  setNewPassBtn = new _simpleBtn.default({
    text: 'Set new password',
    id: 'setNewPassBtn'
  }, 'w30 h5');
  leaderBoard = null;
  activeGamesList = null;
  home = new _home.default({
    id: 'homepage'
  });
  testSafirSlot = null; // = new SafirBuildInPlugins.SafirSlot({id: 'userPoints', rootDom: 'userPoints'}, 'horCenter bg-transparent');
  nickname = null;
  email = null;
  token = null;
  photo = null;
  preventDBREG = false;
  preventDBLOG = false;
  constructor(arg) {
    super(arg);
    this.apiDomain = arg;
    sessionStorage.setItem('domain', arg);
  }
  checkSession() {
    if (sessionStorage.getItem('my-body-email') != null && sessionStorage.getItem('my-body-token') != null) {
      return true;
    } else {
      return false;
    }
  }
  ready = () => {
    if (this.checkSession() == true) {
      this.runApiFastLogin();
      console.info('Fast login');
    }
    this.attach();
    setTimeout(() => {
      app.translate.update();
    }, 1);
  };
  attach() {
    (0, _safir.On)('loginBtn', data => {
      if ((0, _safir.byID)('arg-password').value.length < 8) {
        console.log('valdation: ', (0, _safir.byID)('arg-password').value.length);
        alert('GAMEPLAY PLATFORM : Password length must minimum 8 chars!');
        return;
      }
      if (this.preventDBLOG == false) {
        data.target.disabled = true;
        this.preventDBLOG = true;
        console.info('[login] Trigger Btn', data.detail);
        this.apiAccount('login');
      }
    });
    (0, _safir.On)('forgotBtn', data => {
      if (this.preventDBLOG == false) {
        data.target.disabled = true;
        // this.preventDBLOG = true;
        console.info('[forgotBtn] Trigger Btn', data.detail);
        this.render = this.forgotPassRender;
        (0, _safir.getComp)(this.id).innerHTML = this.render();
        (0, _safir.emit)('app.trans.update', {
          f: 'f'
        });
        // this.apiAccount('forgot-pass');
      }
    });

    (0, _safir.On)('forgotAskBtn', data => {
      if (this.preventDBLOG == false) {
        data.target.disabled = true;
        // this.preventDBLOG = true;
        console.info('[forgotAskBtn] Trigger Btn', data.detail);
        this.apiAccount('forgot-pass');
      }
    });
    (0, _safir.On)('setNewPassBtn', data => {
      if (this.preventDBLOG == false) {
        data.target.disabled = true;
        console.info('[setNewPassBtn] Trigger Btn', data.detail);
        // this.render = this.forgotPassRender;
        // getComp(this.id).innerHTML = this.render();
        // emit('app.trans.update', {f: 'f'});
        this.apiAccount('set-new-pass');
      }
    });
    (0, _safir.On)('registerBtn', data => {
      if ((0, _safir.byID)('arg-password').value.length < 8) {
        console.log('valdation: ', (0, _safir.byID)('arg-password').getAttribute('value'));
        alert('GAMEPLAY PLATFORM : Password length must minimum 8 chars!');
        return;
      }
      if (this.preventDBREG == false) {
        this.preventDBREG = true;
        (0, _safir.byID)('registerBtn-real').disabled = true;
        console.info('[register] Trigger Btn', data.detail);
        this.apiAccount('register');
      }
    });
    (0, _safir.On)('pagNext', () => {
      this.runApiLeaderBoard();
    });
    (0, _safir.On)('pagPrev', () => {
      this.runApiLeaderBoard();
    });
    (0, _safir.On)('gotoLeaderboard', () => {
      if (this.checkSession() == true) {
        this.leaderBoard = new _leaderboard.default({
          id: 'leaderboard',
          currentPagIndex: '0'
        }, 'middle overflowAuto');
        this.runApiLeaderBoard();
        this.leaderBoardRender = () => this.leaderBoard.renderId();
        this.render = this.leaderBoardRender;
        (0, _safir.getComp)(this.id).innerHTML = this.render();
        // funny animation
      } else {
        console.info('no session');
      }
    });
    (0, _safir.On)('gotoAGL', () => {
      if (this.checkSession() == true) {
        this.activeGamesList = new _activegames.default({
          id: 'activeGamesList',
          currentPagIndex: '0'
        }, 'middle overflowAuto');
        this.runApiAGL();
        this.activeGamesListRender = () => this.activeGamesList.renderId();
        this.render = this.activeGamesListRender;
        (0, _safir.getComp)(this.id).innerHTML = this.render();
        // funny animation
      } else {
        console.info('no session');
      }
    });
    (0, _safir.On)('gotoGames', () => {
      if (this.checkSession() == true) {
        // Home
        this.home.apiDomain = this.apiDomain;
        this.homeRender = () => this.home.renderId();
        this.render = this.homeRender;
        (0, _safir.getComp)(this.id).innerHTML = this.render();
      }
    });
    (0, _safir.On)('gotoAccount', arg => {
      // Account
      this.runApiFastLogin();
      if (this.testSafirSlot == null) this.testSafirSlot = new _safir.SafirBuildInPlugins.SafirSlot({
        id: 'userPoints',
        rootDom: 'userPoints'
      }, 'horCenter bg-transparent');
      console.log('goto account trigger - just run fetch for fresh data', arg);
      this.render = this.accountRender;
      (0, _safir.getComp)(this.id).innerHTML = this.render();
    });
    window.addEventListener('gotoAccountShow', arg => {
      // Account
      // this.runApiFastLogin();
      if (this.testSafirSlot == null) this.testSafirSlot = new _safir.SafirBuildInPlugins.SafirSlot({
        id: 'userPoints',
        rootDom: 'userPoints'
      }, 'horCenter bg-transparent');
      console.log('SHOW   rigger - just run fetch for fresh data', arg);
      this.render = this.accountRender;
      (0, _safir.getComp)(this.id).innerHTML = this.render();
    });
  }
  async apiAccount(apiCallFlag) {
    let route = this.apiDomain || location.origin;
    let args = {
      emailField: (0, _safir.byID)('arg-username') != null ? (0, _safir.byID)('arg-username').value : null,
      passwordField: (0, _safir.byID)('arg-password') != null ? (0, _safir.byID)('arg-password').value : null
    };
    if (apiCallFlag == 'confirmation') {
      delete args.passwordField;
      args.tokenField = (0, _safir.byID)('arg-password').value;
    }
    if (apiCallFlag == 'forgot-pass') {
      delete args.passwordField;
      console.log("TEST ARG ", args);
    }
    if (apiCallFlag == 'set-new-pass') {
      args = {
        emailField: (0, _safir.byID)('arg-username').value,
        newPassword: (0, _safir.byID)('arg-new-password').value,
        ftoken: (0, _safir.byID)('arg-ftoken').value
      };
      console.log("TEST SETNEWPASW ", args);
    }
    if (apiCallFlag == 'logout') {
      args = {
        email: _safir.LocalSessionMemory.load('my-body-email'),
        token: _safir.LocalSessionMemory.load('my-body-token')
      };
    }
    var response = fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    }).then(d => {
      return d.json();
    }).then(r => {
      this.exploreResponse(r);
    }).catch(err => {
      setTimeout(() => {
        this.preventDBLOG = false;
        this.preventDBREG = false;
        (0, _safir.byID)('loginBtn-real').disabled = false;
        (0, _safir.byID)('registerBtn-real').disabled = false;
      }, 500);
      return;
    });
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
  async runApiLeaderBoard() {
    // Elegant collecting data => this.leaderBoard.currentPagIndex
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token'),
      criterium: {
        description: 'paginator',
        limitValue: 12,
        currentPagIndex: this.leaderBoard.currentPagIndex
      }
    };
    const rawResponse = await fetch(route + '/rocket/leaderboard', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.leaderBoard.setData(response);
  }
  async runApiAGL() {
    // Elegant collecting data => this.leaderBoard.currentPagIndex
    let route = this.apiDomain || location.origin;
    const args = {
      email: _safir.LocalSessionMemory.load('my-body-email'),
      token: _safir.LocalSessionMemory.load('my-body-token')
    };
    const rawResponse = await fetch(route + '/rocket/active-games/', {
      method: 'POST',
      headers: _safir.JSON_HEADER,
      body: JSON.stringify(args)
    });
    var response = await rawResponse.json();
    this.activeGamesList.setData(response);
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
  exploreResponse(res) {
    var isLogged = false;
    (0, _safir.byID)('apiResponse').innerHTML = '';
    for (let key in res) {
      let color = 'white';
      if (typeof res[key] == 'object') {
        for (let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          console.log("TEST ", key1);
          if (key1 != 'token') {
            (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
          } else {
            console.log("ELSE  ", key1);
          }
        }
      } else {
        if (key == 'message' && res[key] == 'Wrong Password') {
          color = 'text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          setTimeout(() => {
            this.preventDBLOG = false;
            (0, _safir.byID)('loginBtn-real').disabled = false;
          }, 500);
          return;
        } else if (res[key] == 'Confirmation done.') {
          // pass for reg
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' > YOUR ACCOUNT IS READY </div>`;
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' > ${_safir.T.rin2} </div>`;
          setTimeout(() => {
            location.reload();
          }, 2000);
          return;
        } else if (res[key] == 'USER_LOGGED') {
          (0, _safir.On)("signoutBtn", e => {
            // signoutBtn
            this.apiAccount('logout');
          });
          if (!(0, _safir.byID)('userPoint')) {
            dispatchEvent(new CustomEvent('gotoAccountShow', {
              detail: {}
            }));
          }
          isLogged = true;
        } else if (res[key] == 'Wrong confirmation code.') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          setTimeout(() => {
            this.preventDBREG = false;
            (0, _safir.byID)('registerBtn-real').disabled = false;
          }, 500);
          return;
        } else if (res[key] == 'Check email for conmfirmation key.') {
          (0, _safir.byID)('loginBtn-real').remove();
          (0, _safir.byID)('arg-username').setAttribute('style', 'display:none');
          (0, _safir.byID)('registerBtn-real').innerText = 'COMFIRM CODE';
          (0, _safir.byID)('arg-password').value = '';
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          (0, _safir.byID)('registerBtn-real').disabled = false;
          (0, _safir.byID)('registerBtn-real').onclick = () => {
            console.info('[confirmationBtn] Trigger');
            this.apiAccount('confirmation');
          };
          return;
        } else if (res[key] == 'You are already registred.') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          // forgot
          setTimeout(() => {
            this.preventDBREG = false;
          }, 500);
          return;
        } else if (res[key] == 'TOO_SHORT_PASSW') {
          // pass for login
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          setTimeout(() => {
            this.preventDBREG = false;
            (0, _safir.byID)('registerBtn-real').disabled = false;
          }, 1500);
        } else if (res[key] == 'Avatar image saved!') {
          console.log('IMAGE PATH ', res[key]);
          isLogged = true;
          //
          // from global app object - fast fix - hardc
          app.subComponents[0].gotoAccount.onClick('gotoAccount');
        } else if (res[key] == 'CHECK_EMAIL_FORGOT_PASSWORD_CODE') {
          this.render = this.setNewPassRender;
          (0, _safir.getComp)(this.id).innerHTML = this.render();
          (0, _safir.emit)('app.trans.update', {
            f: 'f'
          });
        } else if (res[key] == 'NEW_PASSWORD_DONE') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' > New password call succeed! App will be reloaded and then try new password.</div>`;
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else if (res[key] == 'USER_LOGOUT') {
          console.log('USer logout!');
          sessionStorage.clear();
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
    }
    if (isLogged != true) {
      return;
    }

    // how to use sub rerender
    // simple override
    this.render = this.accountRender;
    if (isLogged == true) {
      setTimeout(() => {
        // NOTE SAFIRSLOT NEED RENDER DOM IN MOMENT OF INSTANCING
        // this.testSafirSlot = new SafirBuildInPlugins.SafirSlot({id: 'userPoints', rootDom: 'userPoints'}, 'horCenter bg-transparent');
        // console.log('construct safir slot...')
        // limit decimals 9 max 
        // document.getElementById('userPoints').children[1].children[0].style.display = 'none';
        // document.getElementById('userPoints').children[1].children[1].style.display = 'none';
        // this.testSafirSlot.setByTime(parseFloat(sessionStorage.getItem('my-body-points')));
      }, 1200);
    } else {
      // alert('this.testSafirSlot' + this.testSafirSlot )
    }
    (0, _safir.getComp)(this.id).innerHTML = this.render();
    (0, _safir.emit)('app.trans.update', {
      f: 'f'
    });
    this.accountData(res);
  }
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
            (0, _safir.byID)('apiResponse').innerHTML += `<input class="uploadAvatarInput" type="file" id="avatar" />`;
            (0, _safir.byID)('apiResponse').innerHTML += `<button type="file" id="uploadAvatar">CHANGE AVATAR</button>`;
            (0, _safir.byID)('avatar').addEventListener('change', this.handleFileUpload, {
              passive: true
            });
            (0, _safir.byID)('uploadAvatar').addEventListener('click', this.handleAvatarUpload, {
              passive: true
            });
          } else if (key1 == 'points') {
            this.setPropById(key1, res[key][key1], 1);
            (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
            this.testSafirSlot.setByTime(parseFloat(res[key][key1]));
          } else {
            console.log('MAYBE ');
            this.setPropById(key1, res[key][key1], 1);
            if (key1 != 'token') {
              (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
            } else {
              console.log("ELSE 2 ", key1);
            }
            // byID('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
          }
        }
      } else {
        if (res[key] == 'USER_LOGGED') {
          (0, _safir.byID)('apiResponse').innerHTML += `<div style='${color}'> 👨‍🚀</div>`;
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
      <div class='middle topHeader'>
        <h2>Welcome , <h2 id='nickname'> ${this.nickname} </h2> </h2>
        <span style="margin:5px;">${this.testSafirSlot.renderId()}</span>
        ${this.signoutBtn.renderId()}
      </div>
      <span id="apiResponse" class=" "></span>
      <div class='midWrapper bg-transparent makeBottomABS'>
      <small data-label="accountBottomText"></small>
      </div>
    </div>
  `;
  forgotPassRender = () => `
  <div class='midWrapper bg-transparent'>
    <div class='middle verCenter h50' style="background-color: transparent">
      <h2>Forgot password form:</h2>
      <input class="w30" id='arg-username' type='text' value='zlatnaspirala@gmail.com' />
      ${this.forgotAskBtn.renderId()}
    </div>
    <span id="apiResponse"></span>
    <div class='midWrapper bg-transparent makeBottomABS'>
    <small data-label="accountBottomText"></small>
    </div>
  </div>`;
  setNewPassRender = () => `
  <div class='midWrapper bg-transparent'>
    <div class='middle verCenter h50' style="background-color: transparent">
      <h2>Set new password form:</h2>
      <p>Email:</p>
      <input class="w30" id='arg-username' type='text' value='' />
      <p>New password:</p>
      <input class="w30" id='arg-new-password' type='text' value='' />
      <p>Token from email:</p>
      <input class="w30" id='arg-ftoken' type='text' value='' />
      ${this.setNewPassBtn.renderId()}
    </div>
    <span id="apiResponse"></span>
    <div class='midWrapper bg-transparent makeBottomABS'>
    <small data-label="accountBottomText"></small>
    </div>
  </div>`;

  // Landing page
  render = () => `
    <div class="paddingtop20 animate-jello2 bg-transparent textCenter">
      <h2 class='blackText' data-label="landingTitle">RocketCraft Platform - Free Games 🌍</h2>
      <br>
      <h2 class='blackText' data-label="welcomeNote1" ></h2>
      <h2 class='blackText' data-label="beFirst"></h2>
      <br>
    </div>
    <div class="midWrapper animate-jello2 bg-transparent">
        <input class="w30" id='arg-username' type='text' value='zlatnaspirala@gmail.com' />
        <input class="w30" id='arg-password' type='password' value='12345678' />
        ${this.loginBtn.renderId()}
        ${this.registerBtn.renderId()}
        ${this.forgotBtn.renderId()}
    </div>
    <div class='midWrapper bg-transparent'>
      <span id="apiResponse"></span>
    </div>
    <div class='midWrapper bg-transparent makeBottomABS'>
    <img src="assets/icons/96.png" class="" />
      <small class="textColorWhite" data-label="beText"></small>
      <small class="textColorWhite" data-label="feText"></small>
    </div>
  `;
}
exports.default = RocketCraftingLayout;

},{"../components/activegames":10,"../components/home":12,"../components/leaderboard":13,"../components/simple-btn":14,"../direct-render/imageProfile":16,"safir":1}],20:[function(require,module,exports){
"use strict";

var _safir = require("safir");
var _rocketCraftingAccount = _interopRequireDefault(require("./layouts/rocket-crafting-account"));
var _heder = _interopRequireDefault(require("./layouts/heder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let app = new _safir.Safir();
console.info('<listeners>', app.listeners);
(0, _safir.On)("app.trans.update", () => {
  app.translate.update();
});
(0, _safir.On)("app.ready", () => {
  /**
   * @description
   * If you put http://localhost then you 
   * need to run rocketCreftingServer on local mashine.
   * You can use also `http://maximumroulette.com`
   */
  app.loadComponent(new _heder.default('my-header'));
  app.loadVanillaComp("vanilla-components/footer.html");
  let apiDomain = 'https://maximumroulette.com';
  // let apiDomain = 'http://localhost';
  app.loadComponent(new _rocketCraftingAccount.default(apiDomain), 'bg-transparent');
  if (_safir.urlVar.lang && _safir.urlVar.lang !== 'en') {
    app.emitML(app, './assets/multilang/' + _safir.urlVar.lang + '.json').then(() => {
      app.translate.update();
    });
  }
  document.body.classList.add('funnyBg2');
}, {
  once: true
});
window.app = app;

},{"./layouts/heder":18,"./layouts/rocket-crafting-account":19,"safir":1}]},{},[20]);
