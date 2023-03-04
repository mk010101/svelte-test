import { CmcElement } from "../CmcElement.js";
export declare class CmcSpinner extends CmcElement {
    #private;
    static _template: string;
    constructor();
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
}
