import { CmcElement } from "../CmcElement.js";
export class CmcSpinner extends CmcElement {
    #blades = [];
    static _template = /*template*/ `
  <style>
    
    .cmc-spinner {
      position: relative;
      min-width: 1em;
      min-height: 1em;
      display: inline-block;
    }


.cmc-spinner div {
width: 8%;
height: 27%;
background: var(--color-primary-40, #adacac);
position: absolute;
left: 46%;
top: 36%;
opacity: 0;
border-radius: .2em;
animation: fade 1s linear infinite;
}

@keyframes fade {
from {opacity: 1;}
to {opacity: 0.25;}
}

.cmc-spinner div:nth-child(1) {
transform:rotate(0deg) translate(0, -130%);
animation-delay: 0s;
}    

.cmc-spinner div:nth-child(2) {
-webkit-transform:rotate(30deg) translate(0, -130%); 
-webkit-animation-delay: -0.9167s;
}

.cmc-spinner div:nth-child(3) {
-webkit-transform:rotate(60deg) translate(0, -130%); 
-webkit-animation-delay: -0.833s;
}
.cmc-spinner div:nth-child(4) {
-webkit-transform:rotate(90deg) translate(0, -130%); 
-webkit-animation-delay: -0.7497s;
}
.cmc-spinner div:nth-child(5) {
-webkit-transform:rotate(120deg) translate(0, -130%); 
-webkit-animation-delay: -0.667s;
}
.cmc-spinner div:nth-child(6) {
-webkit-transform:rotate(150deg) translate(0, -130%); 
-webkit-animation-delay: -0.5837s;
}
.cmc-spinner div:nth-child(7) {
-webkit-transform:rotate(180deg) translate(0, -130%); 
-webkit-animation-delay: -0.5s;
}
.cmc-spinner div:nth-child(8) {
-webkit-transform:rotate(210deg) translate(0, -130%); 
-webkit-animation-delay: -0.4167s;
}
.cmc-spinner div:nth-child(9) {
-webkit-transform:rotate(240deg) translate(0, -130%); 
-webkit-animation-delay: -0.333s;
}
.cmc-spinner div:nth-child(10) {
-webkit-transform:rotate(270deg) translate(0, -130%); 
-webkit-animation-delay: -0.2497s;
}
.cmc-spinner div:nth-child(11) {
-webkit-transform:rotate(300deg) translate(0, -130%); 
-webkit-animation-delay: -0.167s;
}
.cmc-spinner div:nth-child(12) {
-webkit-transform:rotate(330deg) translate(0, -130%); 
-webkit-animation-delay: -0.0833s;
}

  </style>
<div class="cmc-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
`;
    constructor() {
        super();
        this._template = CmcSpinner._template;
    }
    static get observedAttributes() {
        return ["color"];
    }
    connectedCallback() {
        super.connectedCallback();
        this.#blades = Array.from(this.querySelectorAll(".cmc-spinner div"));
        this._setConnected();
    }
    attributeChangedCallback(name, _, newValue) {
        super.attributeChangedCallback(name, _, newValue);
        if (!this._connected)
            return;
        switch (name) {
            case "color":
                this.#blades.forEach((b) => {
                    b.style.backgroundColor = newValue;
                });
        }
    }
}
customElements.define("cmc-spinner", CmcSpinner);
