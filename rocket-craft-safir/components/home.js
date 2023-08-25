import {BaseComponent, byID, On, byTag, JSON_HEADER, LocalSessionMemory} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";
import SimpleButton from "../components/simple-btn";

export default class Home extends BaseComponent {

  id = '';
  btns = [];

  constructGameList() {
    this.links.forEach(element => {
      this.btns.push(new SimpleButton({text: element.name, id: element.action}, 'fill'))

      On(element.action, () => {
        this.loadGamplay(element.link)
      })

    })
  }

  ready = () => {
    this.constructGameList()
  };

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.links = [
      {action: 'platformer', name: "Nidzica", link: 'https://maximumroulette.com/apps/visual-ts/singleplayer/app.html'},
      {action: 'platformer-multiplayer', name: "Multiplayer platformer", link: 'https://maximumroulette.com/apps/visual-ts/multiplayer/app.html'},
      {action: 'hang3d', name: "Hang3d Nightmare", link: 'https://maximumroulette.com/apps/hang3d/'}
    ];
    On('pointsPlus10', () => {
      console.log('POINTS PLUS')
      this.runApiPointsPlus10();
    });
  }

  accessGamplay(i) {
    // for now single tag object
    var t = byTag("object")[i];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument)
  }

  loadGamplay(i) {
    var t = byTag("object")[0];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument)
    t.data = i
    byID('GameList').style.display = 'none';
    byID('gameplayDiv').style.display = 'flex';
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
        if(res[key]) {
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
    alert(this.apiDomain)
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
    <div id="GameList" class="middle gameplayObj" style="display: flex;">
      ${this.btns.map((i) =>
    `${i.renderId()}`).join('')
    }
    </div>
      <div id="gameplayDiv" class="middle gameplayObj" style="display: none;">
        <h2>RocketCraftingServer Platform</h2>
        <h3>Play Platformer [2d]</h3>
        <object id="gameplay" class="gameplay" data="${this.links[0]}"></object>
        <br>
        <button onclick="(${this.pointsPlus10})('pointsPlus10')" >TEST POINTS</button>
        <div id="testResponse"></div>
      </div>
    </div>
  `;
}
