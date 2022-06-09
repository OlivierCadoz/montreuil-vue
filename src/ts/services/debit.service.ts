import { roundSecondDecimal } from "./utils/utils";
import { expensesCalcul, sum, veoliaCalcul } from "./utils/calcul.utils";
import { checkSums, correctDecimal } from "./utils/check.utils";

function getDebit(totalExpense: number): number[] {
  const expenses = expensesCalcul(totalExpense);
  const expensesRounded = expenses.map(roundSecondDecimal);

  const roundedSum = sum(expensesRounded);

  if (roundedSum === totalExpense) return expensesRounded;

  const normalSum = sum(expenses);
  const checked = checkSums(normalSum, roundedSum);

  correctDecimal(checked, expenses, expensesRounded);

  return expensesRounded
}

function getVeolia({
  totalExpense,
  totalConsumption,
  consumptionAxel,
  consumptionOlivier,
}: {
  totalExpense: number,
  totalConsumption: number,
  consumptionAxel: number,
  consumptionOlivier: number,
}): number[] {
  const consumptionChantal =
    totalConsumption - consumptionAxel - consumptionOlivier;

  const consumptions = [
    consumptionChantal,
    consumptionAxel,
    consumptionOlivier,
  ];

  const expenses = veoliaCalcul(consumptions, totalExpense, totalConsumption);

  const expensesRounded = expenses.map(roundSecondDecimal);

  const roundedSum = sum(expensesRounded);

  if (roundedSum === totalExpense) return expensesRounded;

  const normalSum = sum(expenses);
  const checked = checkSums(normalSum, roundedSum);

  correctDecimal(checked, expenses, expensesRounded);

  return expensesRounded;
}

export { getDebit, getVeolia };
