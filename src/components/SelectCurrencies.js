import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies } from '../actions';

class SelectCurrencies extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies, value, onChange } = this.props;

    return (
      <div>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ value }
            onChange={ onChange }
          >
            {currencies.map((currency, index) => (
              <option
                data-testid={ currency.code }
                key={ index }
                value={ currency.code }
              >
                { currency.code }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

SelectCurrencies.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => (
  {
    currencies: state.wallet.currencies,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    getCurrencies: () => dispatch(fetchApiCurrencies()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrencies);
