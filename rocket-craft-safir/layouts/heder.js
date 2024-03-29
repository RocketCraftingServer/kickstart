import SimpleButton from "../components/simple-btn";

import {
  On, T,
  BaseComponent } from "safir";

export default class MyHeader extends BaseComponent {

  id = 'my-heder';
  gotoLeaderboardBtn = new SimpleButton({ text: T.gotoLeaderboard, id: 'gotoLeaderboard'}, 'fill');
  gotoGamesPage = new SimpleButton({ text: 'Games', id: 'gotoGames'}, 'fill');
  gotoAccount = new SimpleButton({ text: 'Account', id: 'gotoAccount'}, 'fill');
  gotoAGL = new SimpleButton({text: 'AGL', id: 'gotoAGL'}, 'fill')

  constructor(arg) {
    super(arg);
    this.initial(arg);

    this.themes = ['dark', 'light', 'orange', 'blue'];
    this.curTheme = 0;

    On('change-theme', () => {
      (this).changeTheme('theme-' +this.themes[this.curTheme]);
      if (this.curTheme >= this.themes.length) {
        this.curTheme = 0;
      } else {
        this.curTheme++;
      }
      console.info('Trigger ChangeTheme integrated.');
    })
  }

  ready = () => {}

  change = this.clickBind;

  render = () => `
    <div class="middle h5">
       <div class="heder">
          <button class="fill" onclick="(${this.change})('change-theme')" data-label="changeTheme" ></button>
          ${(this.gotoLeaderboardBtn).renderId()}
          ${(this.gotoAccount).renderId()}
          ${(this.gotoGamesPage).renderId()}
          ${(this.gotoAGL).renderId()}
       </div>
    </div>
  `
}