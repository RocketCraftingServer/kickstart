import {BaseComponent} from "safir";

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

  render = () => `
    <div class="fill bg-transparent">
      ${this.text}
    </div>
  `;
}
