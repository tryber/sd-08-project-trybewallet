import React from 'react';
import { connect } from 'react-redux';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      dispesaTotal: 0,
      cambio: 'BRL',
    };
  }

  getTotalValue() {
    const { expenses } = this.props;

    let total = 0;
    expenses.map(({
      exchangeRates,
      currency,
      value,
    }) => {
      total
        += exchangeRates[currency].ask * value;
      return total;
    });
    return parseInt(total * 100, 10) * 0.01;
  }

  render() {
    const { email } = this.props;
    const { dispesaTotal, cambio } = this.state;
    return (
      <header className="header">
        <h1 className="header-items">tryberWallet</h1>
        <div className="header-items">
          <span
            className="header-items"
            data-testid="email-field"
          >
            {email}
          </span>
          <span>
            Dispesa Total:
            <span data-testid="total-field">{this.getTotalValue()}</span>
            <span data-testid="header-currency-field">{cambio}</span>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
