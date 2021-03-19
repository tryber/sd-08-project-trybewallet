import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveRequestCurrencies } from '../actions';
import getCurrency from '../services/api';

class SelectCurrency extends Component {
  componentDidMount() {
    this.fetchCurr();
  }

  async fetchCurr() {
    const { saveCurrencies } = this.props;
    const list = await getCurrency();
    saveCurrencies(list);
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <select data-testid="currency-input">
        {
          currencies ? currencies
            .map((curr) => (
              <option
                value={ curr }
                data-testid={ curr }
                key={ curr }
              >
                {curr}
              </option>))
            : ''
        }
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (list) => dispatch(saveRequestCurrencies(list)),
});

SelectCurrency.propTypes = {
  saveCurrencies: PropTypes.function,
  currencies: PropTypes.array,

}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
