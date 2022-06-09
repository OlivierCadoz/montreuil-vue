import { CHECK } from "./constants";
import { toString } from "./utils";

const findResidentIndex = (decimals: number[], decFound: number): number =>
  decimals.findIndex((dec: number) => dec === decFound);

const returnsDecimalsFromThirdToFith = (expense: string): number =>
  +expense.split(".")[1].substring(2, 5);

const returnsDecimals = (expensesList: number[]): number[] => {
  const expClone = expensesList.map(toString);
  return expClone.map(returnsDecimalsFromThirdToFith);
};

const checkWhoseGonnaLooseExtraDecimal = (expensesList: number[]): number => {
  const decimals = returnsDecimals(expensesList);
  const lowestValue = decimals.reduce((acc, curr) => {
    return acc > 5 && acc < curr ? acc : curr;
  });
  return findResidentIndex(decimals, lowestValue);
};

const checkWhoseGonnaGetExtraDecimal = (expensesList: number[]): number => {
  const decimals = returnsDecimals(expensesList);

  const greatestValue = decimals.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
  });

  return findResidentIndex(decimals, greatestValue);
};

export const checkSums = (normalSum: number, roundedSum: number): string => {
  if (normalSum > roundedSum) return CHECK.addExtra;
  if (normalSum < roundedSum) return CHECK.removeExtra;
  return CHECK.isOk;
};

// TODO: refactor this to return a value instead of mutating param
export const correctDecimal = (checked: string, expenses: number[], expensesRounded: number[]): void => {
  if (checked === CHECK.addExtra) {
    const residentIndex = checkWhoseGonnaGetExtraDecimal(expenses);

    expensesRounded[residentIndex] =
      (expensesRounded[residentIndex] * 100 + 1) / 100;
  } else if (checked === CHECK.removeExtra) {
    const residentIndex = checkWhoseGonnaLooseExtraDecimal(expenses);

    expensesRounded[residentIndex] =
      (expensesRounded[residentIndex] * 100 - 1) / 100;
  }
};
