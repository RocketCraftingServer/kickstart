import {BaseComponent, byID, emit} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";

export default class Home extends BaseComponent {

  id = '';

  ready = () => {
  };

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.links = [
      'https://maximumroulette.com/apps/visual-ts/basket-ball-chat/app.html'
    ];

    On('nextClick', () => {
      this.currentPagIndex++;
      this.setPropById('currentPagIndex', this.currentPagIndex, 1);
    });
  }

  onNext = this.clickBind;
  // <button onclick="(${this.onNext})('nextClick')" >NEXT</button>

  render = () => `
    <div id="homePage" class="animate-born myScroll verCenter overflowAuto">
      <div class="middle gameplayObj">
        <h2>RocketCraftingServer Platform</h2>
        <h3>Play Platformer [2d]</h3>
        <object class="gameplay" data="${this.links[0]}"></object>
        <br>
      </div>
    </div>
  `;
}
