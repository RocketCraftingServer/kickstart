import {BaseComponent, byID, On, byTag, JSON_HEADER, LocalSessionMemory} from "safir";
import GameCard from "../components/gameCard";

export default class Home extends BaseComponent {

  id = '';
  btns = [];

  constructGameList() {
    this.links.forEach(e => {
      this.btns.push(new GameCard({text: e.name, id: e.action, poster: e.poster}, 'game-card'))
      On(e.action, () => {
        this.loadGamplay(e.link)
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
      {
        description: "Nidzica",
        action: "platformer",
        poster: "./assets/imgs/platformer-visual-ts.png",
        name: "Nidzica", link: 'https://maximumroulette.com/apps/visual-ts/singleplayer/app.html'
      },
      {
        description: "",
        action: 'platformer-multiplayer',
        poster: "./assets/imgs/platformer-visual-ts.png",
        name: "Multiplayer platformer", link: 'https://maximumroulette.com/apps/visual-ts/multiplayer/app.html'
      },
      {
        description: "",
        action: 'platformer-video-chat',
        poster: "./assets/imgs/platformer-visual-ts.png",
        name: "Platformer Video Chat", link: 'https://maximumroulette.com/apps/visual-ts/basket-ball-chat/app.html'
      },
      {
        description: "",
        action: 'hang3d',
        poster: "./assets/imgs/hang3d.png",
        name: "Hang3d Nightmare", link: 'https://maximumroulette.com/apps/hang3d/'
      },
      {
        description: "",
        action: 'magic-three',
        poster: "./assets/imgs/platformer-visual-ts.png",
        name: "Magic three project", link: 'https://maximumroulette.com/apps/magic/public/module.html'
      },
      {
        description: "",
        action: 'ultimate-roulette',
        poster: "./assets/imgs/ultimate-roulette.png",
        name: "Real Physics Roulette", link: 'https://roulette.maximumroulette.com'
      },
      
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
    var t = byTag("iframe")[0];
    var htmlDocument = t.contentDocument;
    console.log('POACCESS OBJECT TAG', htmlDocument)
    t.src = i
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

  render = () => `
    <div id="homePage" class="animate-born myScroll verCenter overflowAuto">
    <div id="GameList" class="middle gameLists" style="display: flex;">
      ${this.btns.map((i) =>
    `${i.renderId()}`).join('')
    }
    </div>
      <div id="gameplayDiv" class="gameplayObj middle" style="display: none;">
        <h2>RocketCraftingServer Platform Play Platformer [2d] </h2>
        <iframe id="gameplay" class="gameplay" src="${this.links[0]}" allow="camera; microphone" />
        <br>
        <button onclick="(${this.pointsPlus10})('pointsPlus10')" >TEST POINTS REST/API</button>
        <div id="testResponse" style="text-align: center;"></div>
      </div>
    </div>
  `;
}
