import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeleteBtn from './DeleteBtn';

class TableBody extends Component {
  constructor() {
    super();

    this.handleCurrencyName = this.handleCurrencyName.bind(this);
    this.handleExchangeRate = this.handleExchangeRate.bind(this);
    this.CurrencyToConvert = this.CurrencyToConvert.bind(this);
    this.ConvertTheValue = this.ConvertTheValue.bind(this);
  }

  handleCurrencyName(exp) {
    const { currency, exchangeRates } = exp;
    const { name } = exchangeRates[currency];

    return name;
  }

  handleExchangeRate(exp) {
    const { currency, exchangeRates } = exp;
    const { ask } = exchangeRates[currency];

    const rate = Number(ask).toFixed(2);

    return rate;
  }

  ConvertTheValue(exp) {
    const { currency, exchangeRates, value } = exp;
    const { ask } = exchangeRates[currency];

    return (value * ask).toFixed(2);
  }

  CurrencyToConvert(exp) {
    const { currency, exchangeRates } = exp;
    const { codein } = exchangeRates[currency];

    if (codein === 'BRL') {
      return 'Real';
    }

    return codein;
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        { expenses.map((exp) => (
          <tr key={ exp.id }>
            <td role="cell">{ exp.description }</td>
            <td role="cell">{ exp.tag }</td>
            <td role="cell">{ exp.method }</td>
            <td role="cell">{ exp.value }</td>
            <td role="cell">{ this.handleCurrencyName(exp) }</td>
            <td role="cell">{ this.handleExchangeRate(exp) }</td>
            <td role="cell">{ this.ConvertTheValue(exp) }</td>
            <td role="cell">{ this.CurrencyToConvert(exp) }</td>
            <td role="cell">
              <button type="button">Editar</button>
              <DeleteBtn id={ exp.id } />
            </td>
          </tr>
        )) }
      </tbody>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableBody.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableBody);
