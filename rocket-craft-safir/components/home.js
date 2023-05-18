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
      'https://maximumroulette.com/apps/nidza/nidza/examples/single.html?u=star-effect-2.js'
    ];

    On('nextClick', () => {
      this.currentPagIndex++;
      this.setPropById('currentPagIndex', this.currentPagIndex, 1);
    });
  }

  onNext = this.clickBind;

  render = () => `
    <div id="homePage" class="animate-born myScroll verCenter overflowAuto">
      <div class="middle">
        <object data="${this.links[0]}"></object>
        <button onclick="(${this.onNext})('nextClick')" >NEXT</button>
      </div>
    </div>
  `;
}
