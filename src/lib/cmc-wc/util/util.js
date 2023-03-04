/**
 * Returns a percentage of val between min and max.
 * @param min
 * @param max
 * @param val
 * @returns {number}
 */
export function toPercent(min, max, val) {
    return ((val - min) / (max - min)) * 100;
}
export function getCustomPropOrVal(val, backup = "") {
    const bk = backup ? `, ${backup}` : "";
    if (/^--[a-z]/.test(val))
        return `var(${val}${bk})`;
    return val;
}
