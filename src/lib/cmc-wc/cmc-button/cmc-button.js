import { CmcInputElement } from '../CmcInputElement.js';
import { getCustomPropOrVal } from '../util/util.js';
export class CmcButton extends CmcInputElement {
  static template = /*template*/ `
  <style>
    cmc-button {
      display: inline-block;     
    }

    cmc-button div[data-id=content] {
      display: flex;
      align-items: center;
      gap: .5rem;
    }

    cmc-button button {
      appearance: none;
      color: var(--color-secondary-40, #333333);
      background-color: var(--color-primary-60, #cccccc);
      border: none;
      border-radius: var(--border-radius-large, 4rem);
      padding: 1rem 2rem;
      width: 100%; /* for proper sizing of <button> - will fill up the :host */
      cursor: pointer;
      transition: background .3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      line-height: 1rem;
      letter-spacing: .01rem;
      overflow: hidden;
    }
    cmc-button button:focus {
      outline-color:  var(--color-accent-base, #173FB6);
    }

    cmc-button[warning] button {
      color: var(--color-negative, #ff0000);
    }

    cmc-button button:hover {
      background-color:  var(--color-primary-base, #70a53d)
    }
    cmc-button[size=m] button {
      padding: .75rem 1.5rem;
    }
    cmc-button[size=m][icon] button {
      padding: .5rem 1.5rem;
    }
    cmc-button[size=s] button {
      padding: .5rem 1rem;
    }
    cmc-button[size=s][icon] button {
      padding: .25rem 1rem;
    }

    cmc-button[variant=outline] button {
      background-color: transparent;
      color: var(--color-secondary-base, #00573f);
      border-color: var(--color-secondary-base, #00573f);
      border-width: var(--border-width, 2px);
      border-style: var(--border-style, solid);
      padding: calc(1rem - var(--border-width, 2px)) 2rem;
      transition-property: border-color, color;
      transition-duration: .3s;
    }
    cmc-button[variant=outline] button:hover {
      color: var(--color-primary-40, #70a53d);
      border-color: var(--color-primary-40, #70a53d);
    }

    cmc-button[variant=outline][warning] button {
      color: var(--color-negative, #ff0000);
      border-color: var(--color-negative, #ff0000);
    }
    
    cmc-button[variant=outline][icon] button {
      padding: calc(.75rem - var(--border-width, 2px)) calc(2rem - var(--border-width, 2px));
    }

    cmc-button[variant=outline][size=m] button {
      padding: calc(.75rem - var(--border-width, 2px)) calc(1.5rem - var(--border-width, 2px));
    }
    cmc-button[variant=outline][size=m][icon] button {
      padding: calc(.5rem - var(--border-width, 2px)) calc(1.5rem - var(--border-width, 2px));
    }
    cmc-button[variant=outline][size=s] button {
      padding: calc(.5rem - var(--border-width, 2px)) calc(1rem - var(--border-width, 2px));
    }
    cmc-button[variant=outline][size=s][icon] button {
      padding: calc(.25rem - var(--border-width, 2px)) calc(1rem - var(--border-width, 2px));
    }

    cmc-button[variant=tertiary] button {
      color: var(--color-secondary-base, #333333);
      background-color: var(--color-light, #ffffff);
      transition: color .3s;
    }
    cmc-button[variant=tertiary] button:hover,
    cmc-button[variant=iconbackground] button:hover {
      color: var(--color-primary-40, #70a53d);
    }

    cmc-button[variant=tertiary][warning] button {
      color: var(--color-negative, #ff0000);
    }

    cmc-button[variant=simple] button {
      border: none;
      background-color: transparent;
      height: inherit;
      padding: .5rem;
      color: var(--color-secondary-base, #00573f);
      transition: color .3s;
      gap: .5rem;
      border-radius: var(--border-radius-small);
    }
    cmc-button[variant=simple] button:hover {
      color: var(--color-secondary-80, #70a53d);
    }

    cmc-button[variant=simple][warning] button {
      color: var(--color-negative, #ff0000);
    }

    cmc-button[variant=simple][icon] button {
      padding: .25rem;
    }

    cmc-button[iconbackground] button {
      overflow: visible;
      gap: 1rem !important;
    }

    cmc-button[iconbackground] div[data-id="icon-holder"] {
      background-color: var(--color-light, #ffffff);
    }

    cmc-button[icononly] div[data-id=content] {
      display: none;
    }

    cmc-button[icon] button {
      padding: .75rem 2rem;
    }

    cmc-button div[data-id="icon-holder"] {
      display: none;
      border-radius: 100%;
      line-height: 1rem;
      padding: .25rem;
    }

    cmc-button[iconsize=m] div[data-id="icon-holder"] {
      transform: scale(1.25);
    }

    cmc-button[iconsize=l] div[data-id="icon-holder"] {
      transform: scale(1.5);
    }
    cmc-button[iconsize=l] button {
      gap: .75rem;
    }

    cmc-button[iconsize=xl] div[data-id="icon-holder"] {
      transform: scale(2);
    }
    cmc-button[iconsize=xl] button {
      gap: 1rem;
    }

    cmc-button[disabled] {
      opacity: .4;
      pointer-events: none;
    }

    cmc-button[iconposition=right] button {
      flex-direction: row-reverse;
    }

    cmc-button[iconposition=top] button {
      flex-direction: column;
      gap: .25rem;
    }

    cmc-button[iconposition=bottom] button {
      flex-direction: column-reverse;
      gap: .25rem;
    }
    
  </style>

  <button class="cmc-button">
    <div data-id="icon-holder" class="cmc-button__icon-holder"></div>
    <div data-id="content" class="cmc-slot"></div>
  </button>

`;
  #icon = '';
  #iconHolder = null;
  _template;
  constructor() {
    super();
    this._template = CmcButton.template;
  }
  static get observedAttributes() {
    return ['icon', 'iconposition', 'iconcolor'].concat(CmcButton.watchedAttributes);
  }
  connectedCallback() {
    requestAnimationFrame(() => {
      super.connectedCallback();
      this._inputElement = this.querySelector('button');
      this.#iconHolder = this.querySelector('div[data-id="icon-holder"]');
      this._setConnected();
    });
  }
  attributeChangedCallback(name, _, newValue) {
    super.attributeChangedCallback(name, _, newValue);
    if (!this._connected) return;
    switch (name) {
      case 'icon':
        this.#icon = newValue;
        this.#setIcon();
        break;
      case 'iconcolor':
        this.#iconHolder.style.color = getCustomPropOrVal(newValue, '#000');
        break;
    }
  }
  #setIcon() {
    if (!this.#icon || !this.#iconHolder) return;
    this.#iconHolder.classList.remove(...this.#iconHolder.classList);
    this.#iconHolder.classList.add(this.#icon);
    this.#iconHolder.style.display = 'inline-block';
  }
}
customElements.define('cmc-button', CmcButton);
