const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; // Base64 characters

/**
 * Converts three 8-bit numbers into a 4-character Base64 string.
 * @param {number} e1 - The first 8-bit number (part of an RGB value).
 * @param {number} e2 - The second 8-bit number (part of an RGB value).
 * @param {number} e3 - The third 8-bit number (part of an RGB value).
 * @returns {string} - A 4-character Base64 string.
 */
const triplet = (e1: number, e2: number, e3: number) =>
  // Convert the first 6 bits of e1 to a Base64 character
  keyStr.charAt(e1 >> 2) +
  // Convert the last 2 bits of e1 and the first 4 bits of e2 to a Base64 character
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  // Convert the last 4 bits of e2 and the first 2 bits of e3 to a Base64 character
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  // Convert the last 6 bits of e3 to a Base64 character
  keyStr.charAt(e3 & 63);

const generateRGBDataURL = (r: number, g: number, b: number) =>
  //data:[<mediatype>][;base64],<data>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default generateRGBDataURL;
