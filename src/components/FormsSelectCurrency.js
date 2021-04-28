import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions/wallet';

const FormsSelectCurrency = (props) => {
  const { currencies, handleInput } = props;
  return (
    <label htmlFor="currency">
      Currency
      <select
        onChange={ (e) => handleInput('currency', e.target.value) }
        name="currency"
        id="currency"
        data-testid="currency-input"
      >
        {currencies.map((currencie, index) => (
          currencie !== 'USDT'
            && (
              <option
                key={ index }
                data-testid={ currencie }
                value={ currencie }
                name="currency"
                id="currency"
              >
                {currencie}
              </option>)))}
      </select>
    </label>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
});

FormsSelectCurrency.propTypes = {
  currencies: PropTypes.arrayOf(shape({
    code: PropTypes.string,
    codeIn: PropTypes.string,
    name: PropTypes.string,
    bid: PropTypes.string,
  })),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormsSelectCurrency);
