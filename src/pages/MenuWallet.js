import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MenuWallet.css';
import { MakeTotalExpenses, getExpenses } from '../actions/wallet';

class MenuWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {
        '': {
          code: '',
          codein: '',
          name: '',
          high: '',
          low: '',
          varBid: '',
          pctChange: '',
          bid: '',
          ask: '',
          timestamp: '',
          create_date: '',
        },
      },
    };
  }

  Value(e) {
    this.setState({
      value: e,
    });
  }

  CoinSelected(e) {
    const { currencies } = this.props;
    const [result] = currencies.filter((item) => item[1].code === e);
    this.setState({
      currency: e,
      exchangeRates: {
        result,
      },
    });
  }

  methodSelected(e) {
    this.setState({
      method: e,
    });
  }

  tagSelected(e) {
    this.setState({
      tag: e,
    });
  }

  descriptionSelected(e) {
    this.setState({
      description: e,
    });
  }

  AddExpenses() {
    const { currencies } = this.props;
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;
    const result = currencies.filter((item) => item[1].code === currency);
    const actualCode = result[0][1];

    const multiply = actualCode.ask * value;

    this.setState({
      id: id + 1,
    });
    // console.log(exchangeRates);
    const { totalExpensesGet, getingExpenses } = this.props;
    totalExpensesGet(multiply);
    getingExpenses({
      get_Expenses: {
        id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      },
    });
  }

  renderOtherSelects() {
    return (
      <>
        <label
          htmlFor="method-input"
          data-testid="method-input"
          className="value-paymemt-method-label"
        >
          Método de Pagamento:
          <select
            id="method-input"
            onChange={ (e) => this.methodSelected(e.target.value) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="select"
          data-testid="tag-input"
          className="value-tag-label"
        >
          Tag:
          <select
            onChange={ (e) => this.tagSelected(e.target.value) }
            id="select"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </>
    );
  }

  renderSelectsCurrencies() {
    const { currencies } = this.props;
    const coins = currencies.map(
      (item, index) => item[0] !== 'USDT' && (
        <option data-testid={ item[0] } key={ index } value={ item[0] }>
          {item[1].code}
        </option>
      ),
    );
    return (
      <>
        <label
          htmlFor="currency-input"
          data-testid="currency-input"
          className="value-coin-label"
        >
          Moeda:
          <select
            id="currency-input"
            onChange={ (e) => this.CoinSelected(e.target.value) }
          >
            {coins}
          </select>
        </label>
        {this.renderOtherSelects()}
      </>
    );
  }

  render() {
    return (
      <div className="menu-wallet">
        <label className="value-input-label" htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            onChange={ (e) => this.Value(e.target.value) }
            data-testid="value-input"
            type="number"
            className="value-input"
          />
        </label>
        {this.renderSelectsCurrencies()}

        <label htmlFor="description-input" className="value-description-label">
          Descrição:
          <textarea
            id="description-input"
            onChange={ (e) => this.descriptionSelected(e.target.value) }
            data-testid="description-input"
            className="value-input"
          />
        </label>
        <div className="add-expenses-button">
          <button
            type="button"
            onClick={ () => this.AddExpenses() }
            className="add-expenses"
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, total } }) => ({
  currencies,
  expenses,
  total,
});
const mapDispatchToProps = (dispatch) => ({
  totalExpensesGet: (totalExpenses) => dispatch(MakeTotalExpenses(totalExpenses)),
  getingExpenses: ({
    get_Expenses: {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    },
  }) => dispatch(
    getExpenses({
      get_Expenses: {
        id,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      },
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuWallet);
MenuWallet.propTypes = {
  currencies: PropTypes.objectOf.isRequired,
  totalExpensesGet: PropTypes.func.isRequired,
  getingExpenses: PropTypes.func.isRequired,
};
