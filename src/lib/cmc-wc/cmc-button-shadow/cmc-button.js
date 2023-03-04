import { CmcInputElement } from "../CmcInputElement.js";
export class CmcButton extends CmcInputElement {
    static template = /*template*/ `
  <style>
    
    :host {
      display: inline-block; /* for proper sizing of <button> */
    }

    button {
      appearance: none;
      color: var(--color-secondary-40, #333333);
      background-color: var(--color-primary-60, #cccccc);
      border: none;
      border-radius: var(--border-radius-large, 1em);
      padding: 1rem 2rem;
      width: 100%; /* for proper sizing of <button> - will fill up the :host */
      height: 100%;
      cursor: pointer;
      transition: background .3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      overflow: hidden;
      line-height: 110%;
      letter-spacing: .01rem;
    }
    button:focus {
      outline-color:  var(--color-accent-base, #173FB6);
    }
    button:hover {
      background-color:  var(--color-primary-base, #70a53d)
    }

    :host([variant=outline]) button {
      background-color: transparent;
      color: var(--color-secondary-base, #00573f);
      border-color: var(--color-secondary-base, #00573f);
      border-width: var(--border-width, 2px);
      border-style: var(--border-style, solid);
      padding: calc(1rem - var(--border-width)) 2rem;
      transition-property: border-color, color;
      transition-duration: .3s;
    }

    :host([variant=outline]) button:hover {
      color: var(--color-primary-40, #70a53d);
      border-color: var(--color-primary-40, #70a53d);
    }

    :host([variant=tertiary]) button {
      color: var(--color-secondary-40, #00573f);
      background-color: var(--color-light, #ffffff);
      transition: color .3s;
    }

    :host([variant=tertiary]) button:hover {
      color: var(--color-primary-40, #70a53d);

    }

    :host([variant=simple]) button {
      border: none;
      background-color: transparent;
      height: inherit;
      padding: .5rem;
      color: var(--color-secondary-40, #00573f);
      transition: color .3s;
    }

    :host([variant=simple]) button:hover {
      color: var(--color-primary-40, #70a53d);
    }

    :host([size=m]) button {
      padding: .75rem 1.5rem;
    }

    :host([size=m][variant=outline]) button {
      padding: calc(.75rem - var(--border-width)) 1.5rem;
    }

    :host([size=s]) button {
      padding: .5rem 1rem;
    }

    :host([size=s][variant=outline]) button {
      padding: calc(.5rem - var(--border-width)) 1rem;
    }

    :host([icononly]) button {
     height: initial;
     padding: 0.5rem;
    }

    :host([disabled]) {
      opacity: .4;
      pointer-events: none;
    }

    ::slotted(*) {
      fill: currentcolor;
    }

    slot[name=left] {
      font-size: 2rem;
    }
    
  </style>

  <button part="button">
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </button>

`;
    #icon = "";
    #iconPos = "left";
    #left;
    #right;
    #button;
    constructor() {
        super();
        const templ = document.createElement("template");
        templ.innerHTML = CmcButton.template;
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(templ.content.cloneNode(true));
        this.#left = (this.shadowRoot.querySelector('slot[name="left"]'));
        this.#right = (this.shadowRoot.querySelector('slot[name="right"]'));
        this.#button = this.shadowRoot.querySelector("button");
        this._inputElement = this.#button;
    }
    static get observedAttributes() {
        return ["icon", "iconposition"].concat(CmcButton.watchedAttributes);
    }
    attributeChangedCallback(name, _, newValue) {
        super.attributeChangedCallback(name, _, newValue);
        switch (name) {
            case "icon":
                this.#icon = newValue;
                this.#setIcon();
                break;
            case "iconposition":
                if (newValue == "left" || newValue == "right") {
                    this.#iconPos = newValue;
                    this.#setIcon();
                }
                break;
        }
    }
    #setIcon() {
        if (!this.#icon)
            return;
        this.#left.classList.remove(...this.#left.classList);
        this.#right.classList.remove(...this.#right.classList);
        const el = (this.shadowRoot.querySelector(`slot[name="${this.#iconPos}"]`));
        el?.classList.add(this.#icon);
    }
}
customElements.define("cmc-button", CmcButton);
