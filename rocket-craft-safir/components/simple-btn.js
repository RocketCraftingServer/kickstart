import {BaseComponent, byID} from "safir";

export default class SimpleBtn extends BaseComponent {

  id = '';
  text = '';
  ready = () => {};

  setDisabled = () => {
    byID(this.id).disabled = true
  }

  removeDisabled = () => {
    byID(this.id).disabled = false;
  }

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
  }

  onClick = this.clickBind;

  render = () => `
    <button id="${this.id}-real" class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
