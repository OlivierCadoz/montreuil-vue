/**
 * Reducer that sums every value of an array of numbers
 * @param {number} acc
 * @param {number} curr
 * @returns {number}
 */
const sumReducer = (acc: number, curr: number): number => acc + curr;

/**
 * Round a number to the second decimal
 * @param {number} nbr
 * @returns {number}
 */
const roundSecondDecimal = (nbr: number): number => Math.round(nbr * 100) / 100;

/**
 * Make a cross product given the three numbers in arguments
 * @param {number} base
 * @param {number} multiplier
 * @param {number} divider
 * @returns {number}
 */
const crossProduct = (base: number, multiplier: number, divider: number): number =>
  (base * multiplier) / divider;

export { sumReducer, roundSecondDecimal, crossProduct };
