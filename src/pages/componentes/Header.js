import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, despesas } = this.props;
    return (
      <>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{email}</p>
        </header>
        <section>
          <h2>Lista de Gastos</h2>
          <span data-testid="total-field">
            {despesas.reduce((acc, cur) => {
              const { ask } = cur.exchangeRates[cur.moedaI];
              const expense = Number(ask * cur.valor);
              return acc + Number(expense);
            }, 0).toFixed(2)}
          </span>
          <p data-testid="header-currency-field">BRL</p>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
