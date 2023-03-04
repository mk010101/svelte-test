export class NumMask {
    #el;
    #options = { decimals: 2, groupChar: ",", decimalChar: "." };
    constructor(el, template, formatOnBlur = false) {
        if (!el)
            throw new ReferenceError("Element is null or undefined.");
        this.#el = el;
        this.#getOptions(template);
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
        let res = this.#el?.value.replaceAll(this.#options.groupChar, "") || "";
        res = res?.replace(this.#options.decimalChar, ".");
        return res;
    }
    removeListeners() {
        this.#el.removeEventListener("input", this.formatOnInput);
        this.#el.removeEventListener("focus", this.restoreOnfocus);
        this.#el.removeEventListener("blur", this.formatOnBlur);
        this.#el = null;
    }
    formatOnInput() {
        this.format();
    }
    formatOnBlur() {
        this.format(true);
    }
    restoreOnfocus() {
        this.#el.value = this.getValue();
        this.#el.setSelectionRange(0, this.#el.value.length);
    }
    format(blur = false) {
        let { decimals, groupChar, decimalChar } = this.#options;
        let input = this.#el.value;
        if (input === "") {
            return;
        }
        const originalLen = input.length;
        // initial caret position
        let caretPos = this.#el.selectionStart || 0;
        // check for decimal
        let decimalPos = input.indexOf(decimalChar);
        if (decimalPos === -1 && decimals > 0) {
            input = `${input}${decimalChar}${"0".repeat(decimals)}`;
            decimalPos = input.indexOf(decimalChar);
            caretPos -= decimalChar.length + decimals;
        }
        if (decimalPos > -1) {
            if (decimals > 0) {
                let [leftSide, rightSide] = input.split(decimalChar);
                leftSide = this.formatNumber(leftSide, groupChar);
                rightSide = rightSide.replace(/[^0-9]/g, "");
                if (blur) {
                    rightSide += `0${"0".repeat(decimals)}`;
                }
                // Limit decimals
                rightSide = rightSide.substring(0, decimals);
                input = leftSide + decimalChar + rightSide;
            }
            else {
                input = this.formatNumber(input.split(decimalChar)[0], groupChar);
            }
        }
        else {
            input = this.formatNumber(input, groupChar);
            if (blur && decimals > 0) {
                input += `${decimalChar}${"0".repeat(decimals)}`;
            }
        }
        this.#el.value = input;
        // Position caret
        // This should NOT happen on blur, as Safari/WebKit won't release the focus!
        if (!blur) {
            const updated_len = input.length;
            caretPos = updated_len - originalLen + caretPos;
            this.#el.setSelectionRange(caretPos, caretPos);
        }
    }
    formatNumber(n, groupChar = ",") {
        let res = n.replace(/^0{2,}/, "0");
        res = res.replace(/\D/g, "");
        res = Number(res).toString();
        res = res.replace(/\B(?=(\d{3})+(?!\d))/g, groupChar);
        return res;
    }
    #getOptions(template) {
        const parts = template.split(/[]{0,}?\|[]{0,}?/);
        let locale = "en-gb";
        parts.forEach((part) => {
            const [key, value] = part.split(/[]{0,}?\:[]{0,}?/);
            if (/locale/i.test(key))
                locale = value;
            if (/decimals/i.test(key) && !isNaN(Number(value))) {
                this.#options.decimals = Number(value);
            }
        });
        const fmt = new Intl.NumberFormat(locale);
        const fmParts = fmt.formatToParts(1234.56);
        let hasGroup = false;
        fmParts.forEach((p) => {
            if (p.type === "group") {
                this.#options.groupChar = p.value;
                hasGroup = true;
            }
            else if (p.type === "decimal") {
                this.#options.decimalChar = p.value;
            }
        });
        // In some instances Intl does not return group (e.g. if locale="pl")!
        if (!hasGroup)
            this.#options.groupChar = "";
    }
}
