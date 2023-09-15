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

    this.apiDomain = sessionStorage.getItem('domain');
    var t = app.listeners.filter((__) => __.type == 'WannaPlay');
    if(t.length == 0) {
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
      mapName: byID('activeGamesList-map-name').value == '' ? 'level1' : byID('activeGamesList-map-name').value,
      gameName: byID('activeGamesList-game-name').value == '' ? 'platformer' : byID('activeGamesList-game-name').value,
      gameHostAlias: byID('activeGamesList-host').value == '' ? 'maximumroulette.com' : byID('activeGamesList-host').value
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
    byID('activegamesResponse').innerHTML = '<div id="AGL-content" ></div>';
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
          byID('AGL-content').innerHTML += activeGamesListRender(prepare, colorFlag);
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
