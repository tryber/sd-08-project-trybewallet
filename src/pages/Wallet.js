import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm() {
    const coins = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    return (
      <form>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select>
          { coins
            .map((coin, index) => (
              <option
                data-testid={ `${coin}` }
                key={ index + 1 }
              >
                {coin}
              </option>))}
        </select>
      </form>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <header className="wallet-header">
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        { this.renderForm() }
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return ({
    email: state.user.email,
  });
}

export default connect(mapStateToProps)(Wallet);
