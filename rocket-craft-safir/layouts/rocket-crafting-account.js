import {BaseComponent, On, emit, JSON_HEADER, byID, getComp, LocalSessionMemory, SafirBuildInPlugins} from "safir";
import SimpleBtn from "../components/simple-btn";
import {Avatar} from "../direct-render/imageProfile";
import LeaderBoard from "../components/leaderboard";

export default class RocketCraftingLayout extends BaseComponent {

  id = 'my-body';

  apiDomain = '';
  loginBtn = new SimpleBtn({text: 'Login', id: 'loginBtn'}, 'w30');
  registerBtn = new SimpleBtn({text: 'Register', id: 'registerBtn'}, 'w30');
  leaderBoard = new LeaderBoard({id: 'leaderboard'});

  // NOTE SAFIRSLOT NEED RENDER DOM IN MOMENT OF INSTANCING
  testSafirSlot = new SafirBuildInPlugins.SafirSlot({id: 'userPoints', rootDom: 'userPoints'}, 'fit');

  nickname = null;
  email = null;
  token = null;
  photo = null;

  constructor(arg) {
    super(arg);
    console.info('[RC ARGS]:', arg);
    this.apiDomain = arg;
    On('loginBtn', (data) => {
      console.info('[login] Trigger Btn', (data).detail);
      this.runApiCall('login');
    });
    On('registerBtn', (data) => {
      console.info('[register] Trigger Btn', (data).detail);
      this.runApiCall('register');
    });
  }

  ready = () => {
    console.log('RocketCrafting Login form ready.')

    if(sessionStorage.getItem('my-body-email') != null && sessionStorage.getItem('my-body-token') != null) {
      this.runApiFastLogin();
      console.log('RocketCrafting FAST Login form ready. try ')
    }

    // from heder
    On('gotoLeaderboard', () => {
      console.info('Trigger Btn gotoLeaderboard!!!!!!');
      this.render = this.leaderBoardRender;
      getComp(this.id).innerHTML = this.render();
    });

  }

  async runApiCall(apiCallFlag) {
    let route = this.apiDomain || location.origin;
    const args = {
      emailField: byID('arg-username').value,
      passwordField: byID('arg-password').value
    }
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  async runApiFastLogin() {
    // must be fixed this.email at this moment
    let route = this.apiDomain || location.origin;
    const args = {
      email: LocalSessionMemory.load('my-body-email'),
      token: LocalSessionMemory.load('my-body-token')
    }
    const rawResponse = await fetch(route + '/rocket/fast-login', {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  async runUploadAvatar(apiCallFlag) {
    let route = this.apiDomain || location.origin;
    const args = {
      email: this.email,
      token: this.token,
      photo: this.photo
    }
    const rawResponse = await fetch(route + '/rocket/' + apiCallFlag, {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  // Best way - intergalactic
  exploreResponse(res,) {
    byID('apiResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        for(let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
        }
      } else {
        if(key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
        } else if(res[key] == 'USER_LOGGED') {
          // byID('apiResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }

    // how to use sub rerender
    // console.log(" TEST #######")
    // simple override
    this.render = this.accountRender;
    getComp(this.id).innerHTML = this.render();

    // NOTE SAFIRSLOT NEED RENDER DOM IN MOMENT OF INSTANCING
    this.testSafirSlot = new SafirBuildInPlugins.SafirSlot({id: 'userPoints', rootDom: 'userPoints'}, 'fit');

    emit('app.trans.update', {f: 'f'})

    this.accountData(res);

  }

  // Best way - intergalactic
  accountData(res) {
    byID('apiResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        for(let key1 in res[key]) {
          if(key1 == 'profileImage') {
            byID('apiResponse').innerHTML += Avatar({
              key,
              key1,
              res,
              apiDomain: this.apiDomain
            });
            // hot to use in runtime attaching:
            byID('apiResponse').innerHTML += `<input type="file" id="avatar" />`;
            byID('apiResponse').innerHTML += `<button type="file" id="uploadAvatar">CHANGE AVATAR</button>`;
            byID('avatar').addEventListener('change', this.handleFileUpload, {passive: true});
            byID('uploadAvatar').addEventListener('click', this.handleAvatarUpload, {passive: true});
          } else if(key1 == 'points') {
            this.setPropById(key1, res[key][key1], 1);
            byID('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
            this.testSafirSlot.setByTime(parseFloat(res[key][key1]));
          } else {
            this.setPropById(key1, res[key][key1], 1);
            byID('apiResponse').innerHTML += `<div style='${color}' >${key1} : ${res[key][key1]} </div>`;
          }
        }
      } else {
        if(res[key] == 'USER_LOGGED') {
          byID('apiResponse').innerHTML += `<div style='${color}'> 👨‍🚀</div>`;
        }
      }
    }
  }

  handleAvatarUpload = (e) => {
    this.runUploadAvatar('profile/upload');
  }

  handleFileUpload = (e) => {
    const reader = new FileReader();
    let rawImg;
    reader.onloadend = () => {
      rawImg = reader.result;
      this.setPropById('photo', rawImg)
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  leaderBoardRender = () => this.leaderBoard.renderId();

  accountRender = () => `
    <div class='midWrapper bg-transparent'>
      <div class='middle'>
        <h2>Welcome, <h2 id='nickname'>${this.nickname}</h2></h2>
        <span style="margin-right:50px;">${this.testSafirSlot.renderId()}</span>
      </div>
      <span id="apiResponse"></span>
      <div class='midWrapper bg-transparent'>
       <h2> Safir Vanilla Virtual DOM</h2>
      </div>
    </div>
  `;

  render = () => `
    <div class="paddingtop20 animate-jello2 bg-transparent textCenter">
      <h2 class='blackText'>RocketCraft Server 🌍</h2>
       ${this.testSafirSlot.renderId()}
      <p class="textColorWhite">Backend based on <a href="https://github.com/RocketCraftingServer/rocket-craft-server" >rocketCraftingServer</a></p>

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
  `
}
