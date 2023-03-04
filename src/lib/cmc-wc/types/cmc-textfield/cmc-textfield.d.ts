import { CmcInputElement } from "../CmcInputElement.js";
export declare class CmcTextfield extends CmcInputElement {
    #private;
    static template: string;
    _template: string;
    static get observedAttributes(): string[];
    constructor();
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get value(): string;
    get rawValue(): string;
    get template(): string;
    set template(value: string);
    get inputElement(): HTMLInputElement | null;
}
