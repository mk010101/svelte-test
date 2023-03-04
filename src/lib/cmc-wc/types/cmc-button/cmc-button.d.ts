import { CmcInputElement } from "../CmcInputElement.js";
export declare class CmcButton extends CmcInputElement {
    #private;
    static template: string;
    _template: string;
    constructor();
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
}
