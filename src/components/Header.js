import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, amount } = this.props;

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <div data-testid="total-field">
          0
          { amount }
        </div>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.wallet.amount,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.shape.isRequired,
  amount: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Header);
