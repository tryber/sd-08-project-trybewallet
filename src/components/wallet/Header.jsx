import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header
        className="bg-info d-flex
      justify-content-between p-5 shadow border-bottom border-light"
      >
        <div className="border-bottom border-light my-auto p-3">
          <span
            data-testid="header-currency-field"
            className="text-white"
          >
            BRL
          </span>
          <br />
          <span
            id="totalValue"
            data-testid="total-field"
            className="text-danger text-center m-auto"
          >
            {
              expenses.reduce((acc, cur) => {
                const { ask } = cur.exchangeRates[cur.currency];
                const expense = ask * cur.value;
                return acc + expense;
              }, 0).toFixed(2)
            }
          </span>
        </div>
        <h1 className="lead">Minha Carteira</h1>
        <span
          data-testid="email-field"
          className="border-bottom border-light my-auto p-3"
        >
          <strong className="text-white">
            Welcome
          </strong>
          <br />
          { email }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
