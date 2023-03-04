import { CmcInputElement } from "../CmcInputElement.js";
export declare class CmcSelect extends CmcInputElement {
    #private;
    static template: string;
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
}
