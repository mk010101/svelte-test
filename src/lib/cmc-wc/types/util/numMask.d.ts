import { InputMask } from "./inputMask";
export declare class NumMask implements InputMask {
    #private;
    constructor(el: HTMLInputElement, template: string, formatOnBlur?: boolean);
    getValue(): string;
    removeListeners(): void;
    formatOnInput(): void;
    formatOnBlur(): void;
    restoreOnfocus(): void;
    format(blur?: boolean): void;
    formatNumber(n: string, groupChar?: string): string;
}
