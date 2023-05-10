import {BaseComponent, byID} from "safir";
import {LeaderBoardRender} from "../direct-render/leaderboard";

export default class LeaderBoard extends BaseComponent {

  id = '';
  text = '';
  items = [];

  ready = () => {};

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }
  onClick = this.clickBind;

  setData = (res) => {
    byID('leaderBoardResponse').innerHTML = '';

    console.log('RocketCrafting Login form ready.', res)

    for(let key in res) {
      let color = 'white';
      if(typeof res[key] == 'object') {

        for(let key1 in res[key]) {
          let prepare = [];
          for(let key2 in res[key][key1]) {
            prepare.push(
              {
                key: key2,
                value: res[key][key1][key2]
              }
            );
          }
          byID('leaderBoardResponse').innerHTML += LeaderBoardRender(prepare);
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
    <div id="leaderBoardResponse" class="h50 verCenter overflowAuto">
    </div>
  `;
}
