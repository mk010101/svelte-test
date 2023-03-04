import { CmcInputElement } from "../CmcInputElement.js";
export declare class CmcButton extends CmcInputElement {
    #private;
    static template: string;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _: string, newValue: string): void;
}
