import {BaseComponent, byID, emit} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";

export default class ActiveGames extends BaseComponent {

  id = '';
  text = '';
  items = [];

  ready = () => {
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
      if(this.currentPagIndex > 1) {
        this.currentPagIndex--;
        this.setPropById('currentPagIndex', this.currentPagIndex, 1);
        emit('pagPrev');
      }
    });

  }

  onNext = this.clickBind;
  onPrev = this.clickBind;

  setData = (res) => {

    console.log('res active games => ', res)

    byID('activegamesResponse').innerHTML = '';
    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {
        let colorFlag = true;
        for(let key1 in res[key]) {
          let prepare = [];
          for(let key2 in res[key][key1]) {
            prepare.push({key: key2, value: res[key][key1][key2]});
          }
          byID('activegamesResponse').innerHTML += LeaderBoardRender(prepare, colorFlag);
          colorFlag = !colorFlag;
        }
      } else {
        if(key == 'message') {
          console.info("Leaderboard:", res[key]);
        } else if(res[key]) {
          byID('activegamesResponse').innerHTML += `<div style='${color}' >${key} : ${res[key]} 👨‍🚀</div>`;
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
    <div id="activegamesResponse" class="animate-born myScroll verCenter overflowAuto"></div>
    <div id="activegamesPaginator" class="middle myPaddingList">
      <button onclick="(${this.onPrev})('prevClick')" >PREV</button>
      <span id="currentPagIndex"></span>
      <button onclick="(${this.onNext})('nextClick')" >NEXT</button>
    </div>
  `;
}
