import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import { InputNumber, InputText, Select } from './Inputs';
import { fetchThenUpExchangeAct, fetchThenUpCurrenciesAct } from '../actions';

const { useEffect } = React;
const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const WalletForm = ({ currencies, expenses,
  fetchCurrencies, fetchExchangeThenReset, reset }) => {
  const id = expenses.length;

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const handleClick = () => {
    fetchExchangeThenReset(id);
  };

  return (
    <form className="wallet-form">
      <InputNumber name="value-input" label="Valor: " reset={ reset } />
      <InputText name="description-input" label="Descrição: " reset={ reset } />
      <Select data={ currencies } name="currency-input" reset={ reset } />
      <Select data={ payMethods } name="method-input" reset={ reset } />
      <Select data={ tags } name="tag-input" reset={ reset } />
      <button type="button" onClick={ handleClick }>Adicionar despesa</button>
    </form>
  );
};

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}),
  })).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchExchangeThenReset: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  reset: state.reset.walletForm,
});

const mapDispatch = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchThenUpCurrenciesAct()),
  fetchExchangeThenReset: (id) => dispatch(fetchThenUpExchangeAct(id)),
});

export default connect(mapState, mapDispatch)(WalletForm);
