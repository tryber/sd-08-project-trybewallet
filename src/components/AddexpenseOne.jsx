import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddexpenseOne extends Component {
  render() {
    const { infos: {
      value,
      currency,
      handleChange },
    coins } = this.props;
    return (
      <>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            value={ value }
            onChange={ handleChange }
            type="number"
            name="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ handleChange }
          >
            {coins.map((coin) => (
              <option
                name="coins"
                data-testid={ coin.code }
                key={ coin.code }
                value={ coin.code }
              >
                {coin.code}
              </option>
            ))}
          </select>
        </label>
      </>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  coins: currencies,
});

export default connect(mapStateToProps)(AddexpenseOne);

AddexpenseOne.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
  infos: PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
};
