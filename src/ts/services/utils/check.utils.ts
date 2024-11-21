import { CHECK } from "./constants";

const findResidentIndex = (decimals: number[], decFound: number) =>
  decimals.findIndex(dec => dec === decFound);

const returnsDecimalsFromThirdToFith = (expense: string) =>
  +expense.split(".")[1].substring(2, 5);

const returnsDecimals = (expensesList: number[]) => {
  const expClone = expensesList.map(val => val.toString());
  return expClone.map(returnsDecimalsFromThirdToFith);
};

const checkWhoseGonnaLooseExtraDecimal = (expensesList: number[]) => {
  const decimals = returnsDecimals(expensesList);
  const lowestValue = decimals.reduce((acc, curr) => acc > 5 && acc < curr ? acc : curr);
  
  return findResidentIndex(decimals, lowestValue);
};

const checkWhoseGonnaGetExtraDecimal = (expensesList: number[]) => {
  const decimals = returnsDecimals(expensesList);
  const greatestValue = decimals.reduce((acc, curr) => acc > curr ? acc : curr);

  return findResidentIndex(decimals, greatestValue);
};

export const checkSums = (normalSum: number, roundedSum: number) => {
  if (normalSum > roundedSum) return CHECK.addExtra;
  if (normalSum < roundedSum) return CHECK.removeExtra;
  return CHECK.isOk;
};

export const correctDecimal = (checked: string, expenses: number[], expensesRounded: number[]) => {
  const expensesRounded_ = { ...expensesRounded };

  if (checked === CHECK.addExtra) {
    const residentIndex = checkWhoseGonnaGetExtraDecimal(expenses);

    expensesRounded_[residentIndex] =
      (expensesRounded_[residentIndex] * 100 + 1) / 100;
  } else if (checked === CHECK.removeExtra) {
    const residentIndex = checkWhoseGonnaLooseExtraDecimal(expenses);

    expensesRounded_[residentIndex] =
      (expensesRounded_[residentIndex] * 100 - 1) / 100;
  }

  return expensesRounded_;
};
