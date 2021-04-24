import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, saveNewExpense } from '../../actions/wallet.actions';
import SelectCurrency from './expenseForm/SelectCurrency';
import SelectMethod from './expenseForm/SelectedMethod';
import ChangeTag from './expenseForm/ChangeTag';
import InputValue from './expenseForm/InputValue';
import InputDescription from './expenseForm/InputDescription';

const initialState = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

const createId = (arr) => {
  if (arr.length === 0) {
    return 0;
  }
  return arr[arr.length - 1].id + 1;
};

function ExpenseForm(props) {
  const { fetchCurr, saveNewExp, currencies, isFetching, exp } = props;
  const [arrCurrencies, setArrCurrencies] = useState([]);
  const [expense, setExpense] = useState(initialState);

  useEffect(() => {
    fetchCurr();
  }, []);

  useEffect(() => {
    setArrCurrencies(Object.keys(currencies)
      .filter((cur) => cur !== 'USDT'));
  }, [currencies]);

  function handleClick() {
    const exchangeRates = currencies;
    const { value, description, currency, method, tag } = expense;
    const expenses = {
      value, description, currency, method, tag, exchangeRates,
    };
    expenses.id = createId(exp);
    saveNewExp(expenses);
    setExpense(initialState);
  }

  function handleChange({ target: { name, value } }) {
    setExpense({
      ...expense,
      [name]: value });
  }

  return (
    <form action="">
      <InputValue handleChange={ handleChange } value={ expense.value } />
      <SelectMethod handleChange={ handleChange } value={ expense.method } />
      <ChangeTag handleChange={ handleChange } value={ expense.tag } />
      <SelectCurrency
        currencies={ arrCurrencies }
        isFetching={ isFetching }
        handleChange={ handleChange }
        value={ expense.currency }
      />
      <InputDescription handleChange={ handleChange } value={ expense.description } />
      <button type="button" onClick={ handleClick }>Adicionar despesa</button>
    </form>
  );
}

ExpenseForm.propTypes = {
  fetchCurr: PropTypes.func,
  currencies: PropTypes.array,
  isFetching: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetch,
  exp: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
  saveNewExp: (exp) => dispatch(saveNewExpense(exp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
