import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getWalletAPI from '../services/API';
import { fetchWalletAPI as fetchWalletAPIAction,
  saveExpense as saveExpenseAction }
  from '../actions';

const INITIAL_VALUE = {
  value: '',
  method: 'Dinheiro',
  currency: 'USD',
  tag: 'Alimentação',
  description: '',
  id: 0,
  totalValue: 0,
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
  }

  componentDidMount() {
    const { fetchWalletAPI } = this.props;
    fetchWalletAPI();
  }

  getTotalExpenses() {
    const { expenses } = this.props;
    const allExpenses = expenses.reduce((total, each) => {
      const { value, currency, exchangeRates } = each;
      const rate = parseFloat(exchangeRates[currency].ask);
      return total + parseFloat(value) * rate;
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
    const { saveExpense } = this.props;
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
    saveExpense(totalExpense);
    this.setState({
      ...INITIAL_VALUE,
      id: id + 1,
    });
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

  render() {
    const { currencies } = this.props;
    const coinsdata = Object.keys(currencies).filter((elem) => elem !== 'USDT');
    if (coinsdata === '') { return <div />; }
    return (
      <div>
        {this.header()}
        <label htmlFor="coin">
          <select
            data-testid="currency-input"
            id="coin"
            name="currency"
            onChange={ (e) => this.handleChange(e) }
          >
            {coinsdata.map((coin) => (
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
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="reset" onClick={ this.handleClick }>
          Adicionar despesa
        </button>
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
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWalletAPI: () => dispatch(fetchWalletAPIAction()),
  saveExpense: (totalExpense) => dispatch(saveExpenseAction(totalExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
