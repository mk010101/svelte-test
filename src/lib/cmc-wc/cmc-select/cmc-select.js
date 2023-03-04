import { CmcInputElement } from "../CmcInputElement.js";
export class CmcSelect extends CmcInputElement {
    static template = /*html*/ `
    <style>      
      cmc-select {
        display: inline-block;
        vertical-align: -.5em;
      }

      cmc-select label {
        display: inline-grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        cursor: text;
        min-width: 12rem;
      }

      cmc-select select {
        color: var(--color-neutral-base, #333333);
        background-color: var(--color-light, #ffffff);
        grid-row-start: 1;
        grid-column-start: 1;
        font-family: inherit;
        border-color: var(--color-neutral-80, #858282);
        border-width: var(--border-width-thin, 2px);
        border-style: var(--border-style, solid);
        border-radius: var(--border-radius-small, 1em);
        padding: 1.5em 2em .5em .5em;
        width: 100%;
        height: 100%;
        outline: none;
        appearance: none;
      }

      cmc-select select:focus {
        border-color: var(--color-accent-base, #1b64f5);
      }

      cmc-select .floater,
      cmc-select select {
        transition: all 0.2s;
        touch-action: manipulation;
      }

      cmc-select .floater {
        font-weight: normal;
        color: var(--color-neutral-base, #333333);
        padding: .5em .75em;
        grid-row-start: 1;
        grid-column-start: 1;
        line-height: 1.1;
        pointer-events: none;
        font-size: .8rem;
      }

      cmc-select .arrow {
        font-weight: normal;
        color: var(--color-neutral-base, #333333);
        padding-top: .6em;
        padding-right: .5em;
        grid-row-start: 1;
        grid-column-start: 1;
        line-height: 1.1;
        pointer-events: none;
        font-size: 1.5rem;
        text-align: right;
      }

      cmc-select ::placeholder {
        opacity: 0;
        transition: inherit;
      }  

      cmc-select select:not(:placeholder-shown):focus ~ .floater {
        color: var(--color-accent-base, #287fe9);
      }

      cmc-select select:invalid {
        border-color: var(--color-negative, #ff0000);
      }

      cmc-select select:invalid ~ .floater {
        color: var(--color-negative, #ff0000) !important;
      } 

      cmc-select:has(option:checked[value=""]) .floater {
        padding-top: 1.1em;
        font-size: 1rem;
      }
    </style>

    <label>
    <select class="cmcwc-select cmc-slot"></select>
    <div class="floater">placeholder</div>
    <div class="icon-keyboard_arrow_down arrow"></div>
    </label>  
  `;
    #floater = null;
    static get observedAttributes() {
        return CmcInputElement.watchedAttributes.concat();
    }
    constructor() {
        super();
        this._template = CmcSelect.template;
    }
    connectedCallback() {
        super.connectedCallback();
        this._inputElement = this.querySelector(".cmcwc-select");
        this.#floater = this.querySelector(".floater");
        this._setConnected();
    }
    attributeChangedCallback(name, _, newValue) {
        super.attributeChangedCallback(name, _, newValue);
        if (!this._connected)
            return;
        switch (name) {
            case "placeholder":
                this.#floater.textContent = newValue;
                this._inputElement.placeholder = newValue;
                break;
            case "multiple":
                this.#floater.style.display = "none";
                const arrow = this.querySelector(".arrow");
                arrow.style.display = "none";
                break;
        }
    }
}
customElements.define("cmc-select", CmcSelect);
