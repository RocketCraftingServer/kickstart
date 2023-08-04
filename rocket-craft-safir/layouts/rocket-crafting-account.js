import {BaseComponent, On, emit, JSON_HEADER, byID, getComp, LocalSessionMemory, SafirBuildInPlugins} from "safir";
import SimpleBtn from "../components/simple-btn";
import {Avatar} from "../direct-render/imageProfile";
import LeaderBoard from "../components/leaderboard";
import Home from "../components/home";

export default class RocketCraftingLayout extends BaseComponent {

  id = 'my-body';

  apiDomain = '';
  loginBtn = new SimpleBtn({text: 'Login', id: 'loginBtn'}, 'w30');
  registerBtn = new SimpleBtn({text: 'Register', id: 'registerBtn'}, 'w30');
  leaderBoard = null; // new LeaderBoard({id: 'leaderboard', currentPagIndex: '0' }, 'middle overflowAuto');

  home = new Home({id: 'homepage'})

  // NOTE SAFIRSLOT NEED RENDER DOM IN MOMENT OF INSTANCING
  testSafirSlot = null;

  nickname = null;
  email = null;
  token = null;
  photo = null;

  constructor(arg) {
    super(arg);

    this.apiDomain = arg;

    On('loginBtn', (data) => {
      console.info('[login] Trigger Btn', (data).detail);
      this.apiAccount('login');
    });

    On('registerBtn', (data) => {
      console.info('[register] Trigger Btn', (data).detail);
      this.apiAccount('register');
    });

    On('pagNext', () => {
      this.runApiLeaderBoard();
    });

    On('pagPrev', () => {
      this.runApiLeaderBoard();
    });

  }

  ready = () => {
    if(sessionStorage.getItem('my-body-email') != null && sessionStorage.getItem('my-body-token') != null) {
      this.runApiFastLogin();
      console.info('RocketCrafting fast login.');
    }
    On('gotoLeaderboard', () => {
      if(LocalSessionMemory.load('my-body-email') !== false && LocalSessionMemory.load('my-body-token') !== false) {
        this.leaderBoard = new LeaderBoard({id: 'leaderboard', currentPagIndex: '0'}, 'middle overflowAuto');
        this.runApiLeaderBoard();
        this.leaderBoardRender = () => this.leaderBoard.renderId();
        this.render = this.leaderBoardRender;
        getComp(this.id).innerHTML = this.render();

        // funny animation


      } else {
        console.info('no session');
      }
    });

    On('gotoHome', () => {
      // Home
      this.homeRender = () => this.home.renderId();
      this.render = this.homeRender;
      getComp(this.id).innerHTML = this.render();
    })

    On('gotoAccount', () => {
      // Account
      console.log('goto account trigger - just run fetch for fresh data')
      this.render = this.accountRender;
      getComp(this.id).innerHTML = this.render();
      this.runApiFastLogin();
    })
  }

  async apiAccount(apiCallFlag) {
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

  async runApiLeaderBoard() {
    // Elegant collecting data => this.leaderBoard.currentPagIndex
    let route = this.apiDomain || location.origin;
    const args = {
      email: LocalSessionMemory.load('my-body-email'),
      token: LocalSessionMemory.load('my-body-token'),
      criterium: {
        description: 'paginator',
        limitValue: 50,
        currentPagIndex: this.leaderBoard.currentPagIndex
      }
    }
    const rawResponse = await fetch(route + '/rocket/leaderboard', {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.leaderBoard.setData(response);
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

  exploreResponse(res) {
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

    console.log('TEST this.testSafirSlot ', this.testSafirSlot)
    if(this.testSafirSlot == null) {
      // NOTE SAFIRSLOT NEED RENDER DOM IN MOMENT OF INSTANCING
      this.testSafirSlot = new SafirBuildInPlugins.SafirSlot({id: 'userPoints', rootDom: 'userPoints'}, 'horCenter bg-transparent');
    }

    // how to use sub rerender
    // simple override
    this.render = this.accountRender;
    getComp(this.id).innerHTML = this.render();
    emit('app.trans.update', {f: 'f'});
    this.accountData(res);
  }

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

  accountRender = () => `
    <div class='midWrapper bg-transparent'>
      <div class='middle topHeader'>
        <h2>Welcome, <h2 id='nickname'>${this.nickname}</h2></h2>
        <span style="margin:40px;">${this.testSafirSlot.renderId()}</span>
      </div>
      <span id="apiResponse"></span>
      <div class='midWrapper bg-transparent'>
      <h5> <small> Safir VS RocketCraftingServer </small></h5>
      </div>
    </div>
  `;

  render = () => `
    <div class="paddingtop20 animate-jello2 bg-transparent textCenter">
      <h2 class='blackText'>RocketCraft Platform - Free Games 🌍</h2>
      <br>
      <h2 class='blackText'>Be first on leadrboard</h2>
      <p class="textColorWhite">Backend based on <a href="https://github.com/RocketCraftingServer/rocket-craft-server" >rocketCraftingServer</a></p>
      <br>
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
