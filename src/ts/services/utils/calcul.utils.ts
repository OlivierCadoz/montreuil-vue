import { TENTH } from "./constants";
import { sumReducer, crossProduct } from "./utils";

// EXPENSES

/**
 * Cross product of expense given tenth
 * @param {number} expense
 * @param {number} tenth
 * @returns {number}
 */
const expenseProduct = (expense: number, tenth: number) =>
  crossProduct(expense, tenth, TENTH.full);

/**
 * Calcul the expenses for each resident
 * @param {number} expense
 * @returns {Array<number>}
 */
const expensesCalcul = (expense: number) => {
  const expenses: number[] = [];

  [TENTH.chantal, TENTH.axel, TENTH.olivier].forEach((tenth) => {
    expenses.push(expenseProduct(expense, tenth));
  });

  return expenses;
};

// VEOLIA

/**
 * Cross product of veolia expense given the individual and total consumptions
 * @param {number} individualConsumption
 * @param {number} totalExpense
 * @param {number} totalConsumption
 * @returns {number}
 */
const veoliaProduct = (individualConsumption: number, totalExpense: number, totalConsumption: number) =>
  crossProduct(individualConsumption, totalExpense, totalConsumption);

/**
 *
 * @param {Array<number>} consumptions
 * @param {number} totalExpense
 * @param {number} totalConsumption
 * @returns {Array<number>}
 */
const veoliaCalcul = (consumptions: number[], totalExpense: number, totalConsumption: number) =>
  consumptions.map((individualConsumption) =>
    veoliaProduct(individualConsumption, totalExpense, totalConsumption)
  );

// COMMON

/**
 * Sum an array of numbers
 * @param {Array<number>} expenses
 * @returns {number}
 */
const sum = (expenses: number[]) => {
  const expClone = expenses.map((exp) => exp * 100);
  return expClone.reduce(sumReducer) / 100;
};

export { expensesCalcul, veoliaCalcul, sum };
