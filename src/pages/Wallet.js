import React from 'react';
import PropTypes from 'prop-types';

import '../css/wallet.css';

import { connect } from 'react-redux';
import walletLogo from '../images/wallet-with-cash-and-coins_150x116.png';
import nameLogo from '../images/MyWallet_logo_01.png';
import Form from '../components/Form';
import ExpensesList from '../components/ExpensesList';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
  }

  componentDidUpdate() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      this.sumExpenses();
    } else {
      this.setZero();
    }
  }

  setZero() {
    const { total } = this.state;

    if (total !== 0) return this.setState({ total: 0 });
  }

  sumExpenses() {
    const { expenses } = this.props;
    const { total } = this.state;

    const expensesMap = expenses
      .map((expense) => parseFloat(expense
        .value) * parseFloat(expense.exchangeRates[expense.currency].ask));
    const sum = expensesMap
      .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0).toFixed(2);
    if (total !== sum) return this.setState({ total: sum });
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    // if (typeof (email.email) === 'undefined') {
    //   return (
    //     <section>
    //       <h1>Usuário não logado</h1>
    //       <Link to="/">Login</Link>
    //     </section>);
    // }
    return (
      <section>
        <header className="header">
          <div>
            <img src={ walletLogo } alt="wallet" className="wallet-img" />
            <img src={ nameLogo } alt="logo" className="logo-img" />
          </div>
          <div>
            <h1 className="title">Carteira</h1>
          </div>
          <div className="infos-container">
            <p data-testid="email-field">{`E-mail: ${email.email}`}</p>
            <p data-testid="total-field">{`Total: ${total}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <Form />
        <ExpensesList />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.shape(
    {
      email: PropTypes.string,
    },
  ).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number,
      exp: PropTypes.string,
      des: PropTypes.string,
      cur: PropTypes.string,
      met: PropTypes.string,
      tag: PropTypes.string,
      exc: PropTypes.string,
      vex: PropTypes.string,
      cex: PropTypes.string,
    },
  )).isRequired,
};
