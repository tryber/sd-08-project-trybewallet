import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header(props) {
  const { userLogin, expenses } = props;
  // console.log(expenses);
  return (
    <header>
      <div data-testid="email-field">
        Usuário:
        {' '}
        {userLogin}
      </div>
      <div data-testid="total-field">
        Despesa total:
        {
          expenses.length === 0 ? '0'
            : expenses.reduce((acc, cur) => acc + (
              +cur.value * cur.exchangeRates[cur.currency].ask), 0)
              .toFixed(2)
        }
      </div>
      <div>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    </header>
  );
}

Header.propTypes = {
  userLogin: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
