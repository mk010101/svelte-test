import { CmcElement } from "../CmcElement.js";
import { getCustomPropOrVal, toPercent } from "../util/util.js";
/**
 * CmcRangeBar can show a progress of some kind.
 * It has two modes: "segmented" and "normal".
 * To set it to segmented mode, add "steps" attribute with a value.
 */
export class CmcRangeBar extends CmcElement {
    static template = /*template*/ `
  <style>
    cmc-range-bar {
      display: inline-block; 
      width: 100%;
      height: 100%;
    }

    cmc-range-bar .holder {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      margin-top: 0.75rem;
    }

    cmc-range-bar .bar-holder {
      width: 100%;
      height: .5rem;
      background: var(--color-surface-60, #e8e7e7);
      border-radius: var(--border-radius-large, .2em);
      grid-row-start: 1;
      grid-column-start: 1;
      overflow: hidden;
    }

    cmc-range-bar .bar,
    cmc-range-bar .bar-overlay {
      width: 50%;
      height: 100%;
      background: var(--color-primary, #666666);
      border-radius: var(--border-radius-large, .2em);
      text-align: right;
    }

    cmc-range-bar .bar-overlay {
      width: 100%%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      grid-row-start: 1;
      grid-column-start: 1;
      text-align: right;
    }
    cmc-range-bar .bar-overlay > div {
      margin-top: -0.75rem;
      line-height: 0;
      color: var(--color-neutral-2, #948885);
      font-size: .8rem;
    }

    cmc-range-bar .labels {
      display: flex;
      justify-content: space-between;
      color: var(--color-neutral-2, #948885);
      font-size: .8rem;
    }

    :not(cmc-range-bar[hideValue]) .bar > div {
      margin-top: initial;
    }

    cmc-range-bar[hideValue] div[data-id=val] {
      display: none;
    }

    cmc-range-bar[hideLabels] {
      margin-top: initial;
    }
    cmc-range-bar[hideLabels] div[data-id=val] {
      display: none;
    }
    cmc-range-bar[hideLabels] .labels {
      display: none;
    }
    cmc-range-bar[hideLabels] .holder {
      margin-top: 0;
    }

    cmc-range-bar[size=s] .bar-holder {
     height: .2rem;
    }

    cmc-range-bar[size=m] .bar-holder {
     height: .5rem;
    }

    cmc-range-bar[size=l] .bar-holder {
     height: 1rem;
    }

    .cmc-rangebar--segmented {
      display: flex;
      width: 100%;
      gap: 2px;
      background-color: red;
    }

    .cmc-progress-bar__inner {
      width: 100%;
    }

  </style>

  <div class="holder">
    <div class="bar-holder">
      <div class="bar"></div>
    </div>
    <div class="bar-overlay"><div data-id="val">3</div></div>
    <div class="labels">
      <div data-id="min">0</div>
      <div data-id="max">10</div>
    </div>
  </div>
`;
    #min = 0;
    #max = 10;
    #value = 5;
    #decimals = -1;
    #steps = 0;
    #background = "var(--color-surface-60, #e8e7e7)";
    #elBar = null;
    #elBarHolder = null;
    #elBarOverlay = null;
    #colorStops = [];
    #reversed = false;
    constructor() {
        super();
        this._template = CmcRangeBar.template;
    }
    static get observedAttributes() {
        return [
            "min",
            "max",
            "value",
            "colors",
            "colorsattr",
            "reversed",
            "decimals",
            "minwidth",
            "steps",
            "background",
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.#elBarHolder = this.querySelector(".bar-holder");
        this.#elBar = this.querySelector(".bar");
        this.#elBarOverlay = this.querySelector(".bar-overlay");
        this._setConnected();
    }
    attributeChangedCallback(name, _, newValue) {
        super.attributeChangedCallback(name, _, newValue);
        if (!this._connected)
            return;
        switch (name) {
            case "min":
                this.min = newValue;
                break;
            case "max":
                this.max = newValue;
                break;
            case "value":
                this.value = newValue;
                break;
            // Only HEX or CSS custom properties
            case "colors":
                this.#colorStops = newValue.split(/[, ]+/);
                this.#colorStops.forEach((col, ind) => {
                    this.#colorStops[ind] = getCustomPropOrVal(col);
                });
                this.#update();
                break;
            case "reversed":
                this.#reversed = true;
                this.#update();
                break;
            case "decimals":
                this.decimals = newValue;
                break;
            case "minwidth":
                this.#elBar.style.minWidth = newValue;
                break;
            case "steps":
                this.steps = newValue;
                break;
            case "background":
                this.background = newValue;
                break;
        }
    }
    get value() {
        return this.#toFixed(this.#value);
    }
    set value(val) {
        let num = Number(val);
        if (num > this.#max)
            num = this.#max;
        if (num < this.#min)
            num = this.#min;
        if (this.#max === this.#min)
            num = 0;
        this.#value = Number(num);
        this.querySelector('div[data-id="val"]').textContent = this.#toFixed(Number(num));
        this.#update();
    }
    set background(val) {
        this.#background = getCustomPropOrVal(val, "#ccc");
        this.#update();
    }
    set steps(val) {
        this.#steps = parseInt(val, 10);
        const str = '<div class="cmc-progress-bar__inner"> </div>\n'.repeat(this.#steps);
        this.#elBar.innerHTML = str;
        this.#elBar.classList.add("cmc-rangebar--segmented");
        this.#update();
    }
    get max() {
        return this.#max.toString(10);
    }
    set max(val) {
        this.#max = Number(val);
        this.querySelector('div[data-id="max"]').textContent = val;
        this.#update();
    }
    get min() {
        return this.#min.toString(10);
    }
    set min(val) {
        this.#min = Number(val);
        this.querySelector('div[data-id="min"]').textContent = val;
        this.#update();
    }
    set decimals(val) {
        this.#decimals = parseInt(val);
        this.value = this.#value.toString(10);
        this.#update();
    }
    #update() {
        if (!this.#elBar)
            return;
        const prc = toPercent(this.#min, this.#max, this.#value);
        if (this.#steps <= 0) {
            this.#elBar.style.width = `${prc}%`;
        }
        else {
            this.#elBar.style.width = "100%";
            const progress = Math.floor((prc * this.#steps) / 100);
            const divs = this.#elBar.querySelectorAll("div");
            const fgColor = this.#colorStops.length > 0
                ? this.#colorStops[0]
                : "var(--color-primary-40, #666666)";
            for (let i = 0; i < divs.length; i++) {
                divs[i].style.background = i < progress ? fgColor : this.#background;
            }
        }
        this.#elBarOverlay.style.width = `${prc}%`;
        if (this.#colorStops.length > 0 && this.#steps <= 0) {
            const arr = this.#reversed
                ? this.#colorStops.slice().reverse()
                : this.#colorStops;
            const index = Math.min(Math.floor(prc / (100 / arr.length)), arr.length - 1);
            this.#elBar.style.background = arr[index];
        }
        else if (this.#steps > 0) {
            this.#elBar.style.background = "none";
            this.#elBarHolder.style.background = "none";
        }
    }
    #toFixed(val) {
        if (this.#decimals < 0)
            return val.toString(10);
        return val.toFixed(this.#decimals);
    }
}
customElements.define("cmc-range-bar", CmcRangeBar);
