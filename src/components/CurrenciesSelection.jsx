import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../actions/requestCurrency';

class CurrenciesSelection extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currencies, value, changeInput } = this.props;

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ value }
          onChange={ changeInput }
          data-testid="currency-input"
        >
          <option key="choose" value="">Escolha a Moeda</option>
          { currencies.map((option, index) => (option !== 'USDT') && (
            <option
              name={ option }
              key={ index }
              value={ option }
              data-testid={ option }
            >
              { option }
            </option>
          )) }
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

CurrenciesSelection.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSelection);
