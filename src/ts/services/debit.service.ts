import { roundSecondDecimal } from './utils/utils'
import { expensesCalcul, sum, veoliaCalcul } from './utils/calcul.utils'
import { checkSums, correctDecimal } from './utils/check.utils'

function finalExpenses(expenses: number[], totalExpense: number) {
  const expensesRounded = expenses.map(roundSecondDecimal)

  const sumRounded = sum(expensesRounded)

  if (sumRounded === totalExpense) return expensesRounded

  const normalSum = sum(expenses)
  const checked = checkSums(normalSum, sumRounded)

  return correctDecimal(checked, expenses, expensesRounded)
}

function getDebit(totalExpense: number): number[] {
  const expenses = expensesCalcul(totalExpense)

  return finalExpenses(expenses, totalExpense)
}

function getVeolia({
  totalExpense,
  totalCons,
  axelCons,
  olivierCons,
}: {
  totalExpense: number
  totalCons: number
  axelCons: number
  olivierCons: number
}): number[] {
  const chantalCons = totalCons - axelCons - olivierCons

  const consumptions = [chantalCons, axelCons, olivierCons]

  const expenses = veoliaCalcul(consumptions, totalExpense, totalCons)

  return finalExpenses(expenses, totalExpense)
}

export { getDebit, getVeolia }
