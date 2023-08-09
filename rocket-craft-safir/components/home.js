import {BaseComponent, byID, byTag, JSON_HEADER, LocalSessionMemory} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";

export default class Home extends BaseComponent {

  id = '';

  ready = () => {

    window.onmessage = function(e) {
      if(e.data == 'points-plus-10') {
        alert('points-plus-10!');
      }
    };

  };

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.links = [
      'null',
      'https://maximumroulette.com/apps/visual-ts/basket-ball-chat/app.html'
    ];

    On('pointsPlus10', () => {

      console.log('POINTS PLUS')
      this.runApiPointsPlus10();

    });
  }

  accessGamplay() {
    // for now single tag object
    var t = byTag("object")[0];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument)
  }

  exploreResponse(res) {
    console.log('TEST POINTS res', res)
    byID('testResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        for(let key1 in res[key]) {
          color = 'color:indigo;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('testResponse').innerHTML += `<div style='${color}' >${key} : ${res[key][key1]} </div>`;
        }
      } else {
        if(key == 'message' && res[key] == 'Wrong Password') {
          color = 'color:red;text-shadow: 0px 0px 1px #52f2ff, 1px 1px 1px #11ffff;';
          byID('testResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]}</div>`;
          return;
        }
        if ( res[key]) {
          byID('testResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} </div>`;
        }
      }
    }
  }

  async runApiPointsPlus10() {
    // must be fixed this.email at this moment
    let route = this.apiDomain || location.origin;
    const args = {
      email: LocalSessionMemory.load('my-body-email'),
      token: LocalSessionMemory.load('my-body-token')
    }
    alert(this.apiDomain )
    const rawResponse = await fetch(route + '/rocket/point-plus10', {
      method: 'POST',
      headers: JSON_HEADER,
      body: JSON.stringify(args)
    }).catch(() => {
      console.log('err in plus points')
    })
    var response = await rawResponse.json();
    this.exploreResponse(response);
  }

  pointsPlus10 = this.clickBind;
  // 
  // point-plus10

  render = () => `
    <div id="homePage" class="animate-born myScroll verCenter overflowAuto">
      <div class="middle gameplayObj">
        <h2>RocketCraftingServer Platform</h2>
        <h3>Play Platformer [2d]</h3>
        <object class="gameplay" data="${this.links[0]}"></object>
        <br>
        <button onclick="(${this.pointsPlus10})('pointsPlus10')" >TEST POINTS</button>
        <div id="testResponse"></div>
      </div>
    </div>
  `;
}
