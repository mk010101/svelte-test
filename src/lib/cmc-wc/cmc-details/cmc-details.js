import { CmcElement } from "../CmcElement.js";
export class CmcDetails extends CmcElement {
    static template = /*html*/ `
    <style>      
      cmc-details {
        display: inline-block;
        color: var(--color-neutral-base, #333333);
        background-color: var(--color-light, #ffffff);
        border-radius: var(--border-radius-small, 4px);
        padding: .5rem;
        transition: max-height 0.2s ease-out;
        width: 100%;
      }

      cmc-details details summary {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: margin 150ms ease-out;        
      }

      cmc-details details[open] summary {
        margin-bottom: 10px;
      }

      .rotate {
        transform: rotate(180deg);
      }

      cmc-details details summary::marker {
        content: "";
      }

      cmc-details summary::-webkit-details-marker {   display:none; }

      cmc-details .arrow {
        font-size: 1.5rem;
        transition: transform .2s;
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

      
    </style>
    <details>
      <summary>
        <div class="cmcwc-summary"></div>
        <div class="icon-keyboard_arrow_down arrow"></div>
      </summary>
      <p class="cmcwc-text cmc-slot"></p>
    </details>
     
        
  `;
    static get observedAttributes() {
        return ["summary", "open"];
    }
    _details = null;
    #summary = null;
    #summaryText = null;
    #arrow = null;
    constructor() {
        super();
        this._template = CmcDetails.template;
        //this._setOpen = this._setOpen.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.#summary = this.querySelector("summary");
        this.#summaryText = this.querySelector(".cmcwc-summary");
        this._details = this.querySelector("details");
        this.#arrow = this.querySelector(".arrow");
        this.#summary.addEventListener("click", this._setOpen);
        this._registerListener(this.#summary, "click", this._setOpen);
        this._setConnected();
    }
    attributeChangedCallback(name, _, newValue) {
        super.attributeChangedCallback(name, _, newValue);
        if (!this._connected)
            return;
        switch (name) {
            case "summary":
                this.#summaryText.innerHTML = newValue;
                break;
            case "open":
                this._details.setAttribute("open", "");
                break;
        }
    }
    _setOpen() {
        if (!this._details)
            return;
        if (!this._details.hasAttribute("open")) {
            this.#arrow.classList.add("rotate");
        }
        else {
            this.#arrow.classList.remove("rotate");
        }
    }
}
customElements.define("cmc-details", CmcDetails);
