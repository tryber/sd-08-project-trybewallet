import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;

    const total = expenses.reduce(
      (acc, expense) => (
        acc + (parseInt(expense.value, 10)
        * expense.exchangeRates[expense.currency].ask)
      ), 0,
    );

    return (
      <header>
        <p>
          Usuário:
          {' '}
          <span data-testid="email-field">
            {user}
          </span>
        </p>
        <p>
          Despesas: R$
          <span data-testid="total-field">{total.toFixed(2)}</span>
        </p>
        <p>
          Moeda de Câmbio:
          {' '}
          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default connect(mapStateToProps)(Header);
