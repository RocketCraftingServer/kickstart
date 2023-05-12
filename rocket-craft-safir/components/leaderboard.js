import {BaseComponent, byID, emit} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";

export default class LeaderBoard extends BaseComponent {

  id = '';
  text = '';
  items = [];

  ready = () => {
    this.setPropById('currentPagIndex', 1, 1);
  };

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.currentPagIndex = 1;

    On('nextClick', () => {
      this.currentPagIndex++;
      this.setPropById('currentPagIndex', this.currentPagIndex, 1);
      emit('pagNext');
    });

    On('prevClick', () => {
      if (this.currentPagIndex > 1) {
        this.currentPagIndex--;
        this.setPropById('currentPagIndex', this.currentPagIndex, 1);
        emit('pagPrev');
      }
    });

  }

  onNext = this.clickBind;
  onPrev = this.clickBind;

  setData = (res) => {
    // for ( var x = 0; x < byID('leaderBoardResponse').children.length;x++) {
    //   console.log('WHAT INSIDE', byID('leaderBoardResponse').children[x])
    // };
    byID('leaderBoardResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        let colorFlag = true;
        for(let key1 in res[key]) {
          let prepare = [];
          for(let key2 in res[key][key1]) {
            prepare.push({key: key2, value: res[key][key1][key2]});
          }
          byID('leaderBoardResponse').innerHTML += LeaderBoardRender(prepare, colorFlag);
          colorFlag = !colorFlag;
        }
      } else {
        if(key == 'message') {
          console.info("Leaderboard:", res[key]);
        } else if(res[key]) {
          byID('leaderBoardResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
        }
      }
    }
  }

  render = () => `
    <div id="leaderBoardResponse" class="h50 verCenter overflowAuto fit"></div>
    <div id="leaderBoardPaginator" class="middle myPaddingList">
      <button onclick="(${this.onPrev})('prevClick')" >PREV</button>
      <span id="currentPagIndex">1</span>
      <button onclick="(${this.onNext})('nextClick')" >NEXT</button>
    </div>
  `;
}
