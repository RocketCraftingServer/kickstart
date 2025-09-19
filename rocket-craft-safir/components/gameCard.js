import {BaseComponent, byID, T} from "safir";

export default class GameCard extends BaseComponent {

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
    <div class="game-card" style="display:flex;background-image:url(${this.args.poster});    background-size: cover;">
      <button id="${this.id}-real" 
              style="" 
              class="cardBtn fill bg-transparent" onclick="(${this.onClick})('${this.id}')">
       <span class='center-text-game-card'> ${this.text} </span>
      </button>
    </div>
  `;
}
