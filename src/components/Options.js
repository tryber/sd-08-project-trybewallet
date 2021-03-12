import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getWalletAPI from '../services/API';
import { fetchWalletAPI as fetchWalletAPIAction,
  saveExpense as saveExpenseAction,
  editedExpense as editedExpenseAction,
  saveEditedExpense as saveEditedExpenseAction }
  from '../actions';

const INITIAL_VALUE = {
  value: '',
  method: 'Dinheiro',
  currency: 'USD',
  tag: 'Alimentação',
  description: '',
  id: 0,
};

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_VALUE,
    };
    this.handleChange = this.handleChange.bind(this);
    this.header = this.header.bind(this);
    this.renderOptionsMethod = this.renderOptionsMethod.bind(this);
    this.getTotalExpenses = this.getTotalExpenses.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.renderOptionsTag = this.renderOptionsTag.bind(this);
  }

  componentDidMount() {
    const { fetchWalletAPI } = this.props;
    fetchWalletAPI();
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const allExpenses = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      acc += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
      return acc;
    }, 0);
    return allExpenses.toFixed(2);
  }

  header() {
    const { email } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            Despesas Totais:
            {this.getTotalExpenses()}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
          />
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ (e) => this.handleChange(e) }
            />
          </label>
        </div>
      </>
    );
  }

  async handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpense, saveEditedExpense, isEditing } = this.props;
    const exchangeRates = await getWalletAPI();
    const totalExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    if (isEditing === true) {
      saveEditedExpense(totalExpense);
    } else {
      saveExpense(totalExpense);
    }
    this.setState({
      ...INITIAL_VALUE,
      id: id + 1,
    });
  }

  handleEditing() {
    const { editedExpense, editingExpense } = this.props;
    const { value, method, currency, tag, description, id } = editingExpense;
    this.setState({
      ...INITIAL_VALUE,
      value,
      method,
      currency,
      tag,
      description,
      id,
    });
    editedExpense();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  renderOptionsMethod() {
    return (
      <>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </>
    );
  }

  renderOptionsTag() {
    return (
      <>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </>
    );
  }

  render() {
    const { currencies, isEditing, selectEdited } = this.props;
    const { currency, method, tag } = this.state;
    // const coinsdata = Object.keys(currencies).filter((elem) => elem !== 'USDT');
    return (
      <div>
        {this.header()}
        <label htmlFor="coin">
          <select
            data-testid="currency-input"
            id="coin"
            name="currency"
            value={ currency }
            onChange={ (e) => this.handleChange(e) }
          >
            {currencies.map((coin) => (
              <option key={ coin } value={ coin } data-testid={ coin }>
                {coin}
              </option>))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ (e) => this.handleChange(e) }
          >
            {this.renderOptionsMethod()}
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleChange(e) }
          >
            {this.renderOptionsTag()}
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>
          {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
        {selectEdited ? this.handleEditing() : null }
      </div>
    );
  }
}

Options.propTypes = {
  email: PropTypes.string.isRequired,
  fetchWalletAPI: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  editedExpense: PropTypes.arrayOf(PropTypes.string).isRequired,
  editingExpense: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  selectEdited: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
  editingExpense: state.wallet.editingExpense,
  isEditing: state.wallet.isEditing,
  selectEdited: state.wallet.selectEdited,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWalletAPI: () => dispatch(fetchWalletAPIAction()),
  saveExpense: (totalExpense) => dispatch(saveExpenseAction(totalExpense)),
  editedExpense: () => dispatch(editedExpenseAction()),
  saveEditedExpense: (expense) => dispatch(saveEditedExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
