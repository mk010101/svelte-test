export declare class CmcElement extends HTMLElement {
    _pendingAttributes: string[][];
    _connected: boolean;
    _initialised: boolean;
    _template: string | null;
    _slot: HTMLDivElement | null;
    _listeners: Listener[];
    constructor();
    attributeChangedCallback(_name: string, _: string, _newValue: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    appendChild<T extends Node>(node: T): T;
    removeChild<T extends Node>(child: T): T;
    append(...nodes: (string | Node)[]): void;
    _setConnected(): void;
    _registerListener(el: HTMLElement | null, type: keyof HTMLElementEventMap, listener: any): void;
    _unregisterListener(el: HTMLElement | null, type: keyof HTMLElementEventMap, listener: any): void;
    _unregisterAll(): void;
    _applyPendingAttributes(): void;
}
type Listener = {
    el: HTMLElement | null;
    type: keyof HTMLElementEventMap;
    listener: EventListenerOrEventListenerObject;
};
export {};
