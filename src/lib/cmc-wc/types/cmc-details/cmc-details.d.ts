import { CmcElement } from "../CmcElement.js";
export declare class CmcDetails extends CmcElement {
    #private;
    static template: string;
    static get observedAttributes(): string[];
    _details: HTMLDetailsElement | null;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    _setOpen(): void;
}
