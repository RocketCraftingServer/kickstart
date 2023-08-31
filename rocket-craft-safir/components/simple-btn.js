import {BaseComponent, byID, T} from "safir";

export default class SimpleBtn extends BaseComponent {

  id = '';
  text = '';
  ready = () => {
    if (this.args.label) {
      console.log('ml:', byID(this.id+'-real').setAttribute('data-label', this.args.label))
    }
  };

  setDisabled = () => {
    byID(this.id).disabled = true
  }

  removeDisabled = () => {
    byID(this.id).disabled = false;
  }

  constructor(arg, arg2 = '') {
    super(arg);
    this.initial(arg, arg2);
    this.args = arg;
  }

  onClick = this.clickBind;

  render = () => `
    <button id="${this.id}-real" class="fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
      ${this.text}
    </button>
  `;
}
