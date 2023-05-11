import SimpleButton from "../components/simple-btn";

import {
  On, T,
  BaseComponent } from "safir";

export default class MyHeader extends BaseComponent {

  id = 'my-heder';
  gotoLeaderboardBtn = new SimpleButton({ text: T.gotoLeaderboard, id: 'gotoLeaderboard'}, 'fill');
  gotoHomePage = new SimpleButton({ text: 'Home', id: 'gotoHome'}, 'fill');
  gotoAccount = new SimpleButton({ text: 'Account', id: 'gotoAccount'}, 'fill');

  constructor(arg) {
    super(arg);
    this.initial(arg);

    On('gotoLeaderboard', () => {
      console.info('Trigger Btn gotoLeaderboard', (this));
    });

    On('change-theme', () => {
      (this).changeTheme();
      console.info('Trigger ChangeTheme integrated.');
    })

  }

  change = this.clickBind;

  render = () => `
    <div class="middle h5">
       <div class="heder">
          <img src="assets/icons/96.png" class="h5" />
          <button class="fill" onclick="(${this.change})('change-theme')">
            Change Theme
          </button>
          ${(this.gotoLeaderboardBtn).renderId()}
          ${(this.gotoAccount).renderId()}
          ${(this.gotoHomePage).renderId()}
       </div>
    </div>
  `
}
