import { CmcInputElement } from '../CmcInputElement.js';
import { getCustomPropOrVal } from '../util/util.js';
export class CmcCheck extends CmcInputElement {
  static template = /*html*/ `
    <style>
      cmc-check {
        display: inline-block;
        user-select: none;
        color: var(--color-neutral-base);
        zvertical-align: -.15rem;     
      }

      .cmc-check__label {
        display: flex;
        align-items: center;
        gap: .5rem;
      }

      .cmc-check__input {
        opacity: 0;
        width: 0;
      }

      .cmc-check--checked, .cmc-check--unchecked {
        width: 1.1rem;
        height: 1.1rem;
        border-color: var(--color-secondary-base, #00573f);
        border-width: var(--border-width, 2px);
        border-style: var(--border-style, solid);
        border-radius: var(--border-radius-xsmall, 2px);
        display: flex;
        align-items: center;
        justify-content: center;
        justify-self: flex-end;
      }

      .cmc-check--checked > div, .cmc-check--unchecked > div {
        display: block;
        transform: scale(.8);
        font-weight: bolder;
        position: absolute;
        
      }

      .cmc-check--checked {
        display: none;
      }

      .cmc-check__input:checked ~ .cmc-check--unchecked {
        display: none;
      }
      .cmc-check__input:checked ~ .cmc-check--checked {
        display: flex;
        background-color: var(--color-secondary-base, #00573f);
        color: var(--color-light, #ffffff);
      }

      cmc-check[shape="round"] .cmc-check--checked, 
      cmc-check[shape="round"] .cmc-check--unchecked {
        border-radius: 50%;
      }

      cmc-check[iconsize="m"] .cmc-check--checked, 
      cmc-check[iconsize="m"] .cmc-check--unchecked {
        width: 1.25rem;
        height: 1.25rem;
        font-size: 1.25rem;
      }
      cmc-check[iconsize="l"] .cmc-check--checked, 
      cmc-check[iconsize="l"] .cmc-check--unchecked {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.5rem;
      }

      cmc-check[variant="panel"] {
        width: 100%;
      }
      cmc-check[variant="panel"] .cmc-slot {
        width: 100%;
      }
      cmc-check[variant="panel"] .cmc-check__label {
        background-color: var(--color-light, #ffffff);
        width: 100%;
        padding: 1rem;
        border-radius: var(--border-radius-small, 4px);
        flex-direction: row-reverse;
        justify-content: space-between;
      }
    </style>

    <label class="cmc-check__label">
        <input type="radio" class="cmc-check__input">        
        <div class="cmc-check--checked"><div class="icon-check"></div></div>
        <div class="cmc-check--unchecked"><div></div></div>              
        <div class="cmc-slot"></div>
    </label>
  `;
  _label = null;
  _template;
  constructor() {
    super();
    this._template = CmcCheck.template;
  }
  static get observedAttributes() {
    return ['label', 'iconcolor'].concat(CmcCheck.watchedAttributes);
  }
  attributeChangedCallback(name, _, newValue) {
    // console.log(name, newValue);
    super.attributeChangedCallback(name, _, newValue);
    if (!this._connected) return;
    switch (name) {
      case 'label':
        this._label.textContent = newValue;
        break;
      case 'iconcolor':
        const checked = this.querySelector('.cmc-check--checked');
        const unchecked = this.querySelector('.cmc-check--unchecked');
        checked.style.backgroundColor = getCustomPropOrVal(newValue);
        checked.style.borderColor = getCustomPropOrVal(newValue);
        unchecked.style.borderColor = getCustomPropOrVal(newValue);
        break;
    }
  }
  connectedCallback() {
    requestAnimationFrame(() => {
      super.connectedCallback();
      this._label = this.querySelector('.cmc-slot');
      this._setInputEl(this.querySelector('input'));
      this._setConnected();
    });
  }
}
customElements.define('cmc-check', CmcCheck);
