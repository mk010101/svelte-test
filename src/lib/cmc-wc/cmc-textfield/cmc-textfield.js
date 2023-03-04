import { CmcInputElement } from '../CmcInputElement.js';
import { getMask } from '../util/inputMask.js';
export class CmcTextfield extends CmcInputElement {
  static template = /*html*/ `
    <style>      
      cmc-textfield {
        display: inline-block;
        vertical-align: -.5em;
      }

      cmc-textfield label {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        width: 100%;
        cursor: text;
      }

      cmc-textfield input {
        color: var(--color-neutral-base, #333333);
        background-color: var(--color-light, #ffffff);
        grid-row-start: 1;
        grid-column-start: 1;
        font-family: inherit;
        border-color: var(--color-neutral-80, #858282);
        border-width: var(--border-width-thin, 1px);
        border-style: var(--border-style, solid);
        border-radius: var(--border-radius-small, 4px);
        padding: 1.5em 2em .5em .5em;
        width: 100%;
        outline: none;
        appearance: none;
      }

      cmc-textfield input[type="search"]::-webkit-search-decoration,
      cmc-textfield input[type="search"]::-webkit-search-cancel-button,
      cmc-textfield input[type="search"]::-webkit-search-results-button,
      cmc-textfield input[type="search"]::-webkit-search-results-decoration { 
        display: none; 
        appearance: none;
      }

      cmc-textfield input:focus {
        border-color: var(--color-accent-base, #1b64f5);
      }
      cmc-textfield input:focus + .floater {
        transform: translate( .15em, -1.1em) scale(.8);
        color: var(--color-accent-base, #1b64f5);
        opacity: 1;
      }
      cmc-textfield input:not(:placeholder-shown) + .floater {
        transform: translate( .15em, -1.1em) scale(.8);
      }

      cmc-textfield .floater,
      cmc-textfield input {
        transition: all 0.2s;
        touch-action: manipulation;
      }

      cmc-textfield .floater {
        font-weight: normal;
        color: var(--color-neutral-base, #333333);
        opacity: .6;
        padding: 1.1em .5em;
        grid-row-start: 1;
        grid-column-start: 1;
        line-height: 1.1;
        transform-origin: left bottom;
        pointer-events: none;
      }

      cmc-textfield ::placeholder {
        opacity: 0;
        transition: inherit;
      }

      cmc-textfield input:not(:placeholder-shown):focus + .floater {
        color: var(--color-accent-base, #287fe9);
      }

      cmc-textfield input:invalid {
        border-color: var(--color-negative, #ff0000);
        color: var(--color-negative, #ff0000);
      }
      cmc-textfield input:invalid + .floater {
        color: var(--color-negative, #ff0000) !important;
      } 

      cmc-textfield[warn] input {
        color: var(--color-negative, #ff0000) !important;
        border-color: var(--color-negative, #ff0000) !important;
      } 
      cmc-textfield[warn]  .floater {
        color: var(--color-negative, #ff0000) !important;
      } 
      
      cmc-textfield .decorator {
        grid-row-start: 1;
        grid-column-start: 1;
        justify-self: end;
        margin-top: .95em;
        margin-right: .5em;
        font-size: 1.2em;
        display: none;
        cursor: pointer;
        line-height: 0;
        color: var(--color-neutral-base, #333333);
      }

      cmc-textfield .decorator * {
        pointer-events: none;
      }

      cmc-textfield[type=password] .eye {
        display: inline-block;
      }
      cmc-textfield[type=password] .eye .icon-eye {
        display: none;
      }

      cmc-textfield[type=password] input[type=text] ~ .eye .icon-eye {
        display: inline-block;
      }

      cmc-textfield[type=password] input[type=text] ~ .eye .icon-eye-blocked {
        display: none;
      }

      cmc-textfield[type=search] input:not(:placeholder-shown) ~ .clear {
        display: inline-block;
      }

      cmc-textfield[type=date] input::-webkit-calendar-picker-indicator { 
        display: none;
      }

      cmc-textfield[uppercase] input {
        text-transform: uppercase;
      }
      
    </style>

    <label>
      <input
          type="text"
          placeholder=" "
      />
      <div class="floater">placeholder</div>
      <div class="eye decorator" data-id="password">
        <div class="icon-eye-blocked"></div>
        <div class="icon-eye"></div>
      </div>
      <div class="clear decorator" data-id="search">
        <div class="icon-clear"></div>
      </div>
    </label>  
  `;
  #floater = null;
  _template = '';
  #inputMask = null;
  #templ = '';
  static get observedAttributes() {
    return CmcTextfield.watchedAttributes.concat(['template']);
  }
  constructor() {
    super();
    this._template = CmcTextfield.template;
  }
  attributeChangedCallback(name, _, newValue) {
    super.attributeChangedCallback(name, _, newValue);
    if (!this._connected) return;
    switch (name) {
      case 'placeholder':
        this.#floater.textContent = newValue;
        this._inputElement.placeholder = newValue;
        break;
      case 'template':
        this.template = newValue;
        break;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this._setInputEl(this.querySelector('input'));
    this.#floater = this.querySelector('.floater');
    this._registerListener(this, 'click', this.#iconClickHandler);
    this._setConnected();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.#inputMask) this.#inputMask.removeListeners();
  }
  get value() {
    if (!this._inputElement) return '';
    if (this.#inputMask) return this.#inputMask.getValue();
    return this._inputElement.value;
  }
  get rawValue() {
    if (!this._inputElement) return '';
    return this._inputElement.value;
  }
  get template() {
    return this.#templ;
  }
  set template(value) {
    if (!this.hasAttribute('template')) this.setAttribute('template', value);
    if (!this._inputElement) return;
    if (!value) {
      console.warn('<cmc-textfield>: no template value provided.');
      return;
    }
    // Cleanup if previous template was set
    if (this.#templ && this.#inputMask) {
      this.#inputMask.removeListeners();
    }
    this.#templ = value;
    const mask = getMask(this._inputElement, this.#templ);
    if (mask) this.#inputMask = mask;
  }
  get inputElement() {
    return this._inputElement;
  }
  #iconClickHandler(e) {
    const targ = e.target;
    const id = targ.getAttribute('data-id');
    if (!id) return;
    switch (id) {
      case 'password':
        if (this._inputElement?.type === 'password') {
          this._inputElement.type = 'text';
        } else {
          this._inputElement.type = 'password';
        }
        break;
      case 'search':
        this._inputElement.value = '';
        break;
    }
  }
}
customElements.define('cmc-textfield', CmcTextfield);
