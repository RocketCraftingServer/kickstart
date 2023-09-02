import {BaseComponent, byID, LocalSessionMemory, JSON_HEADER} from "safir";
import {activeGamesListRender} from "../direct-render/agl";

export default class ActiveGames extends BaseComponent {

  id = '';
  text = '';
  items = [];

  ready = () => {
  };

  preventor1 = false;
  preventor2 = false;

  funcWP = () => {
    if(this.preventor1 == false) {
      this.preventor1 = true;
      this.runApiWannaPlay()
      setTimeout(() => {
        this.preventor1 = false;
      }, 2000)
    }
  }

  funcDWP = () => {
    if(this.preventor2 == false) {
      this.preventor2 = true;
      this.runApiRemoveMeFromList()
      setTimeout(() => {
        this.preventor2 = false;
      }, 2000)
    }
  }

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.currentPagIndex = 1;

    var t = app.listeners.filter((__) => __.type == 'WannaPlay');
    if(t.length == 0) {
      On('WannaPlay', this.funcWP);
      On('End', this.funcDWP);
    }
  }

  onWannaPlay = this.clickBind;
  onEnd = this.clickBind;

  async runApiRemoveMeFromList() {
    let route = this.apiDomain || location.origin;
    const args = {
      email: LocalSessionMemory.load('my-body-email'),
      token: LocalSessionMemory.load('my-body-token')
    }
    const rawResponse = await fetch(route + '/rocket/remove-from-server-list', {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    // this.setData(response);
    app.subComponents[0].gotoAGL.onClick('gotoAGL')
  }

  async runApiWannaPlay() {
    let route = this.apiDomain || location.origin;
    const args = {
      email: LocalSessionMemory.load('my-body-email'),
      token: LocalSessionMemory.load('my-body-token'),
      mapName: 'this-is-channel1',
      sessionPlatform: 'platformer-multiplayer'
    }
    const rawResponse = await fetch(route + '/rocket/wanna-play', {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    })
    var response = await rawResponse.json();
    this.setData(response);

    setTimeout(() => {
      app.subComponents[0].gotoAGL.onClick('gotoAGL')
    }, 2000)
  }

  setData = (res) => {

    byID('activegamesResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        let colorFlag = true;
        for(let key1 in res[key]) {
          let prepare = [];
          for(let key2 in res[key][key1]) {
            if(key2 == 'sessionHostIp') {
              console.log('sessionHostIp active games => ', res[key][key1][key2])
              prepare.push({key: key2, value: res[key][key1][key2].split('.')[0] + ".*.*.*"});
            } else {
              prepare.push({key: key2, value: res[key][key1][key2]});
            }
          }
          byID('activegamesResponse').innerHTML += activeGamesListRender(prepare, colorFlag);
          colorFlag = !colorFlag;
        }
      } else {
        if(key == 'message') {
          console.info("activegamesResponse:", res[key]);
          byID('activegamesResponse').innerHTML += `<div style='color:${color};margin-bottom:10px;' >${key} : ${res[key]} 👨‍🚀</div>`;
        } else if(res[key]) {
          byID('activegamesResponse').innerHTML += `<div style='color:${color};margin-bottom:10px;' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }

    // new test
    var locCollectItems = [];
    for(var x = 0;x < byID('activegamesResponse').children.length;x++) {
      for(var y = 0;y < byID('activegamesResponse').children[x].children.length;y++) {
        locCollectItems.push(byID('activegamesResponse').children[x].children[y])
      }
    };
    locCollectItems.forEach((item, index) => {
      setTimeout(function() {
        locCollectItems[index].classList.add('animate-bounce1')
      }, 50 * index)
    })
  }

  render = () => `
    <h2>Active server games list - It is information about your multiplayer possibility to play with others</h2>
    <div id="activegamesResponse" class="animate-born myScroll verCenter overflowAuto"></div>
    <div id="activegamesPaginator" class="middle myPaddingList">
      <button onclick="(${this.onWannaPlay})('WannaPlay')" >Wanna Play - call this from gameplay - send most important data to make multiplayer gplay</button>
      <button onclick="(${this.onEnd})('End')" >I dont wanna host/play any game - remove me from list </button>
    </div>
  `;
}
