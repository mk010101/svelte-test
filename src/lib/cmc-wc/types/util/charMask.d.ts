import { InputMask } from "./inputMask";
export declare class CharMask implements InputMask {
    #private;
    constructor(el: HTMLInputElement, template: string, formatOnBlur?: boolean);
    getValue(): string;
    removeListeners(): void;
    formatOnInput(): void;
    formatOnBlur(): void;
    restoreOnfocus(): void;
    strip(input: string, template: string): string;
    build(input: string, template: string): string;
    format(shouldRestoreCursor?: boolean): void;
    formatInput(input: string): string;
    restoreCursor(callback: Function): void;
}
