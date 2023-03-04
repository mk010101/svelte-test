import { CmcInputElement } from "../CmcInputElement.js";
export declare class CmcCheck extends CmcInputElement {
    static template: string;
    private _label;
    _template: string;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    connectedCallback(): void;
}
