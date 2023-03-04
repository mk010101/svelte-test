export class CharMask {
    #templateChars = ["9", "A", "*"];
    #regMap = {
        9: /[0-9.]/,
        A: /[a-zA-Z]/,
        "*": /[a-zA-Z0-9.]/,
    };
    #el;
    #template;
    #lastInput = "";
    constructor(el, template, formatOnBlur = false) {
        this.#el = el;
        this.#template = template;
        this.formatOnInput = this.formatOnInput.bind(this);
        this.formatOnBlur = this.formatOnBlur.bind(this);
        this.restoreOnfocus = this.restoreOnfocus.bind(this);
        if (!formatOnBlur) {
            el.addEventListener("input", this.formatOnInput);
        }
        else {
            el.addEventListener("focus", this.restoreOnfocus);
        }
        el.addEventListener("blur", this.formatOnBlur);
    }
    getValue() {
        return this.strip(this.#el.value, this.#template);
    }
    removeListeners() {
        this.#el?.removeEventListener("input", this.formatOnInput);
        this.#el?.removeEventListener("focus", this.restoreOnfocus);
        this.#el?.removeEventListener("blur", this.formatOnBlur);
        this.#el = null;
    }
    formatOnInput() {
        this.format();
    }
    formatOnBlur() {
        this.format(false);
    }
    restoreOnfocus() {
        this.#el.value = this.getValue();
    }
    strip(input, template) {
        let inputToBeStripped = input;
        let output = "";
        let wildcardTemplate = "";
        for (let i = 0; i < template.length; i++) {
            if (this.#templateChars.includes(template[i])) {
                wildcardTemplate += template[i];
                continue;
            }
            for (let j = 0; j < inputToBeStripped.length; j++) {
                if (inputToBeStripped[j] === template[i]) {
                    inputToBeStripped =
                        inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);
                    break;
                }
            }
        }
        for (let i = 0; i < wildcardTemplate.length; i++) {
            let found = false;
            for (let j = 0; j < inputToBeStripped.length; j++) {
                if (this.#regMap[wildcardTemplate[i]].test(inputToBeStripped[j])) {
                    output += inputToBeStripped[j];
                    inputToBeStripped =
                        inputToBeStripped.slice(0, j) + inputToBeStripped.slice(j + 1);
                    found = true;
                    break;
                }
            }
            if (!found)
                break;
        }
        return output;
    }
    build(input, template) {
        let clean = Array.from(input);
        let output = "";
        for (let i = 0; i < template.length; i++) {
            if (!this.#templateChars.includes(template[i])) {
                output += template[i];
                continue;
            }
            if (clean.length === 0)
                break;
            output += clean.shift();
        }
        return output;
    }
    format(shouldRestoreCursor = true) {
        let input = this.#el.value;
        // Deal with backspace
        if (this.#lastInput.length - this.#el.value.length === 1) {
            this.#lastInput = this.#el.value;
            return;
        }
        let setInput = () => {
            this.#lastInput = this.#el.value = this.formatInput(input);
        };
        if (shouldRestoreCursor) {
            this.restoreCursor(() => {
                setInput();
            });
        }
        else {
            setInput();
        }
    }
    formatInput(input) {
        if (input === "")
            return "";
        let strippedDownInput = this.strip(input, this.#template);
        let rebuiltInput = this.build(strippedDownInput, this.#template);
        return rebuiltInput;
    }
    restoreCursor(callback) {
        let cursorPosition = this.#el.selectionStart || 0;
        let unformattedValue = this.#el.value;
        callback();
        let beforeLeftOfCursorBeforeFormatting = unformattedValue.slice(0, cursorPosition);
        let newPosition = this.build(this.strip(beforeLeftOfCursorBeforeFormatting, this.#template), this.#template).length;
        this.#el.setSelectionRange(newPosition, newPosition);
    }
}
