import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Currencies extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <label htmlFor="input-currency">
        Moeda
        <select name="currency" id="input-currency" data-testid="currency-input">
          {currencies.map((currency, index) => {
            if (currency === 'USDT') return '';
            return (
              <option
                key={ index }
                value={ currency }
                data-testid={ currency }
              >
                {currency}
              </option>);
          })}
        </select>
      </label>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(Currencies);

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
