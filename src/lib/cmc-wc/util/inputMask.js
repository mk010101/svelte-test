import { CharMask } from "./charMask.js";
import { NumMask } from "./numMask.js";
export function getMask(el, template) {
    if (!template) {
        console.error("No template attribute found.");
        return null;
    }
    let formatOnBlur = false;
    let isNum = false;
    let tmpl = "";
    const parts = template.split(/[]{0,}?\|[]{0,}?/);
    parts.forEach((part) => {
        if (/\bformatOnBlur\b/i.test(part)) {
            formatOnBlur = true;
        }
        else if (/number/i.test(part)) {
            isNum = true;
        }
        else {
            tmpl = part;
        }
    });
    if (!isNum) {
        return new CharMask(el, tmpl, formatOnBlur);
    }
    return new NumMask(el, template, formatOnBlur);
}
