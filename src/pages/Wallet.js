import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formulario from '../components/form';
import Tabela from '../components/tabela';

class Wallet extends React.Component {
  render() {
    const { email, expenseData } = this.props;

    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <h2 data-testid="total-field">
            {expenseData.reduce((acc, curr) => {
              const { ask } = curr.exchangeRates[curr.currency];
              const total = Number(ask * curr.value);
              return acc + Number(total);
            }, 0).toFixed(2)}
          </h2>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <Formulario />
        <Tabela />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenseData: state.wallet.expenses,

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenseData: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
