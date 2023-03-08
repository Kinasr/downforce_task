/**
 * Extracts the last number (digit) from the input string and returns it as an integer value.
 * @param {string} str - The input string from which to extract the last number.
 * @returns {number} An integer value representing the last number in the input string.
 * @example
 * const str = "abc123xyz456";
 * const lastNum = parseLastNumberOfString(str); // lastNum is 456
 */
export function parseLastNumberOfString(str: string) {
    const numStr = str.match(/\d+$/);

    return parseInt(numStr[numStr.length - 1]);
}