import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddexpenseOne extends Component {
  render() {
    const { infos: {
      expenseAmount,
      selectedCoin,
      handleChange },
    coins } = this.props;
    return (
      <>
        <label htmlFor="expenseAmount">
          Valor:
          {' '}
          <input
            value={ expenseAmount }
            onChange={ handleChange }
            type="number"
            name="expenseAmount"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="selectedCoin">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            name="selectedCoin"
            onChange={ handleChange }
            value={ selectedCoin }
          >
            {coins.map((coin) => (
              <option
                name="coins"
                data-testid={ coin.code }
                key={ coin.code }
              >
                {coin.name}
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
    expenseAmount: PropTypes.string.isRequired,
    selectedCoin: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
};
