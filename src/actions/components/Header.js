import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h2>Wallet</h2>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          { `Despesas totais: ${expenses.reduce(
            (acc, curr) => acc + parseInt(curr.value, 10), 0,
          )}` }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(Header);
