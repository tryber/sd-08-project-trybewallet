export const formatMoney = (value, placeOfAcronym) => new Intl
  .NumberFormat(placeOfAcronym, {
    style: 'currency', currency: placeOfAcronym,
  }).format(value);

export function totalMoneyInTheWallet(expensesData, placeOfAcronym) {
  const valorExpenses = expensesData.map((expense) => {
    const exchange = Object.keys(expense.exchangeRates)
      .find((rate) => rate === expense.currency) || 'BRL';
    const valueExchange = exchange === 'BRL' ? 1.00 : expense.exchangeRates[exchange].ask;
    return expense.value * valueExchange;
  });

  const combineExpenseValue = valorExpenses
    .reduce((acc, crr) => acc + crr, 0);

  return formatMoney(combineExpenseValue, placeOfAcronym);
}
