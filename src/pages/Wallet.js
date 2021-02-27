import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Forms from '../components/Forms';

class Wallet extends React.Component {
  render() {
    const { receivedEmail, expenses } = this.props;
    // console.log(this.props);
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <div data-testid="email-field">
            {receivedEmail}
          </div>
          <div>
            <p>Despesas totais: </p>
          </div>
          <span data-testid="total-field">
            {expenses.reduce((acc, cur) => {
              const { ask } = cur.exchangeRates[cur.currency];
              const expense = Number(ask * cur.value);
              return acc + Number(expense);
            }, 0).toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <Forms />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  receivedEmail: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
