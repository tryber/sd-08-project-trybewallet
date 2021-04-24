import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, saveNewExpense, submitiEdit } from '../../actions/wallet.actions';
import SelectCurrency from './expenseForm/SelectCurrency';
import SelectMethod from './expenseForm/SelectedMethod';
import ChangeTag from './expenseForm/ChangeTag';
import InputValue from './expenseForm/InputValue';
import InputDescription from './expenseForm/InputDescription';
import fetchApi from '../../services/Api';

// const initialState = {
//   value: '0',
//   description: '',
//   currency: 'USD',
//   method: 'Dinheiro',
//   tag: 'Alimentação',
//   id: 0,
// };

const createId = (arr) => {
  if (arr.length === 0) {
    return 0;
  }
  return arr[arr.length - 1].id + 1;
};

// eslint-disable-next-line max-lines-per-function
function ExpenseForm(props) {
  const {
    fetchCurr, isEdit, saveNewExp, currencies, isFetching, exp, initialValues, subEdit,
  } = props;
  const [arrCurrencies, setArrCurrencies] = useState([]);
  const [expense, setExpense] = useState({ ...initialValues });
  useEffect(() => { fetchCurr(); }, []);
  useEffect(() => { setExpense({ ...initialValues }); }, [initialValues]);
  useEffect(() => {
    setArrCurrencies(currencies.filter((cur) => cur !== 'USDT'));
  }, [currencies]);

  async function handleClick() {
    const exchangeRates = await fetchApi();
    const { value, description, currency, method, tag, id } = expense;
    const expenses = {
      value, description, currency, method, tag, exchangeRates, id,
    };
    if (!isEdit) {
      expenses.id = createId(exp);
      saveNewExp(expenses);
      setExpense(initialValues);
    }
    if (isEdit) {
      subEdit(expense);
      setExpense(initialValues);
    }
  }

  function handleChange({ target: { name, value } }) {
    setExpense({ ...expense, [name]: value });
  }

  const btnStr = () => (isEdit ? 'Editar despesa' : 'Adicionar despesa');

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
      <button type="button" onClick={ handleClick }>{btnStr()}</button>
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
  isEdit: state.wallet.isEdit,
  editExpense: state.wallet.editExpense,
  initialValues: state.wallet.initValues,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
  saveNewExp: (exp) => dispatch(saveNewExpense(exp)),
  subEdit: (exp) => dispatch(submitiEdit(exp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
