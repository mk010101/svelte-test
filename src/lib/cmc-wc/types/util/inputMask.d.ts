export declare function getMask(el: HTMLInputElement, template: string): InputMask | null;
export interface InputMask {
    getValue(): string;
    removeListeners(): void;
}
