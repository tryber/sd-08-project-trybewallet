// import { connect } from 'react-redux';

const sumExpensesTotal = (expensesArray) => {
  const extractConvertedExpenses = expensesArray.map((expense) => {
    const { currency, exchangeRates, value } = expense;
    const exchangeRate = exchangeRates[currency].ask;
    const convertedValue = exchangeRate * value;
    const roundValue = parseFloat((convertedValue).toFixed(2));
    return roundValue;
  });
  const sumConvertedExpenses = extractConvertedExpenses
    .reduce((curr, acc) => curr + acc);
  const roundConverted = sumConvertedExpenses.toFixed(2);
  return (roundConverted);
};

export default sumExpensesTotal;
