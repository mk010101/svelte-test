import { CmcElement } from "./CmcElement.js";
export declare class CmcInputElement extends CmcElement {
    protected _inputElement: HTMLInputElement | null;
    static watchedAttributes: string[];
    constructor();
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    focus(options?: FocusOptions | undefined): void;
    blur(): void;
    get name(): string;
    set name(value: string);
    get type(): string;
    set type(value: string);
    get value(): string;
    set value(value: string);
    get disabled(): boolean | undefined;
    get checked(): boolean;
    set checked(value: boolean);
    get required(): boolean;
    set required(value: boolean);
    get cols(): string;
    set cols(value: string);
    get rows(): string;
    set rows(value: string);
    get validity(): ValidityState | undefined;
    checkValidity(): boolean | undefined;
    setCustomValidity(message: string): void;
    connectedCallback(): void;
}
