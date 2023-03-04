import { CmcElement } from "../CmcElement.js";
/**
 * CmcRangeBar can show a progress of some kind.
 * It has two modes: "segmented" and "normal".
 * To set it to segmented mode, add "steps" attribute with a value.
 */
export declare class CmcRangeBar extends CmcElement {
    #private;
    static template: string;
    constructor();
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    get value(): string;
    set value(val: string);
    set background(val: string);
    set steps(val: string);
    get max(): string;
    set max(val: string);
    get min(): string;
    set min(val: string);
    set decimals(val: string);
}
