import { CmcInputElement } from "../CmcInputElement.js";
export class CmcTextarea extends CmcInputElement {
    static template = /*html*/ `
    <style>      
      cmc-textarea {
        display: inline-block;
      }

      cmc-textarea label {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        cursor: text;
      }

      cmc-textarea textarea {
        color: var(--color-neutral-base, #333333);
        background-color: var(--color-light, #ffffff);
        grid-row-start: 1;
        grid-column-start: 1;
        font-family: inherit;
        border-color: var(--color-neutral-80, #858282);
        border-width: var(--border-width-thin, 2px);
        border-style: var(--border-style, solid);
        border-radius: var(--border-radius-small, 1em);
        padding: 1.5em 2em 1em .5em;
        width: 100%;
        height: 100%;
        outline: none;
        appearance: none;
        resize: none;
      }

      cmc-textarea textarea:focus {
        border-color: var(--color-accent-base, #1b64f5);
      }

      cmc-textarea .floater,
      cmc-textarea textarea {
        transition: all 0.2s;
        touch-action: manipulation;
      }

      cmc-textarea .floater {
        font-weight: normal;
        color: var(--color-neutral-base, #333333);
        padding: 1.1em .5em;
        grid-row-start: 1;
        grid-column-start: 1;
        line-height: 1.1;
        pointer-events: none;
        opacity: .6;
        transform-origin: left bottom;
      }

      cmc-textarea ::placeholder {
        opacity: 0;
        transition: inherit;
      }

      cmc-textarea[noplaceholder] .floater {
        display: none;
      }

      cmc-textarea textarea:not(:placeholder-shown) ~ .floater {
        transform: translate(0em, -1.4em) scale(.8);
      }

      cmc-textarea textarea:focus ~ .floater {
        color: var(--color-accent-base, #287fe9);
        transform: translate(0em, -1.4em) scale(.8);
        opacity: 1;
      }

      cmc-textarea textarea:invalid {
        border-color: var(--color-negative, #ff0000);
        color: var(--color-negative, #ff0000);
      }
      cmc-textarea textarea:invalid ~ .floater {
        color: var(--color-negative, #ff0000);
      } 

      cmc-textarea[warn] textarea {
        border-color: var(--color-negative, #ff0000);
      }
      cmc-textarea[warn] ~ .floater {
        color: var(--color-negative, #ff0000);
      } 
    </style>

    <label>
    <textarea class="cmcwc-textarea"></textarea>
    <div class="floater">placeholder</div>
    </label>  
  `;
    #floater = null;
    static get observedAttributes() {
        return CmcTextarea.watchedAttributes.concat();
    }
    constructor() {
        super();
        this._template = CmcTextarea.template;
    }
    connectedCallback() {
        super.connectedCallback();
        this._inputElement = (this.querySelector(".cmcwc-textarea"));
        this.#floater = this.querySelector(".floater");
        this._setConnected();
    }
    attributeChangedCallback(name, _, newValue) {
        if (!this._connected) {
            this._pendingAttributes.push([name, newValue]);
            return;
        }
        super.attributeChangedCallback(name, _, newValue);
        switch (name) {
            case "placeholder":
                this.#floater.textContent = newValue;
                this._inputElement.placeholder = newValue;
                break;
        }
    }
}
customElements.define("cmc-textarea", CmcTextarea);
