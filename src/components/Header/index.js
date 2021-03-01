import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          { expenses.length
            ? expenses.reduce((
              total, { value, currency, exchangeRates },
            ) => {
              const exchange = (value * exchangeRates[currency].ask);
              const sum = total + exchange;
              return sum;
            }, 0)
            : 0 }
        </div>
        <div data-testid="header-currency-field">BRL</div>
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
