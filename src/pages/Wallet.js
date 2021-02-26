import React from 'react';
import PropTypes from 'prop-types';

import '../css/wallet.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import walletLogo from '../images/wallet-with-cash-and-coins_150x116.png';
import nameLogo from '../images/MyWallet_logo_01.png';
import Form from '../components/Form';
import ExpensesList from '../components/ExpensesList';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
    };
  }

  componentDidUpdate() {
    this.sumExpenses();
  }

  sumExpenses() {
    const { totalExpenses } = this.state;
    const { expenses } = this.props;
    const expensesMap = expenses.map((expense) => parseFloat(expense.exp));
    const sum = expensesMap.reduce((acc, cur) => acc + cur, 0);
    if (sum !== totalExpenses) {
      this.setState({
        totalExpenses: sum,
      });
    }
  }

  render() {
    const { totalExpenses } = this.state;
    const { email } = this.props;
    if (typeof (email.email) === 'undefined') {
      return (
        <section>
          <h1>Usuário não logado</h1>
          <Link to="/">Login</Link>
        </section>);
    }
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
            <p data-testid="total-field">{`Total: ${totalExpenses}`}</p>
            <p data-testid="header-currency-field">Moeda</p>
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
    },
  )).isRequired,
};
