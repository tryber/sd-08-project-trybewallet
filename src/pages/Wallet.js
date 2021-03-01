import React from 'react';
import PropTypes from 'prop-types';

import '../css/wallet.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import walletLogo from '../images/wallet-with-cash-and-coins_150x116.png';
import nameLogo from '../images/MyWallet_logo_01.png';
import Form from '../components/Form';
import ExpensesList from '../components/ExpensesList';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
      currency: '',
    };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidUpdate() {
    const { currency } = this.state;
    this.sumExpenses();
    if (currency === '') return this.getCurrencies();
  }

  async getCurrencies() {
    const { currency } = this.state;
    const { currencies, getAPIData } = this.props;

    if (currency === '') {
      await getAPIData();
      const currenciesMap = currencies.find((element) => element.currency === 'USD');
      const currencyUpdated = currenciesMap.currencyDetails.codein;
      this.setState({
        currency: currencyUpdated,
      });
    }
  }

  sumExpenses() {
    const { totalExpenses } = this.state;
    const { expenses } = this.props;
    const expensesMap = expenses
      .map((expense) => parseFloat(expense.exp) * parseFloat(expense.exchange.ask));
    const sum = parseFloat(expensesMap.reduce((acc, cur) => acc + cur, 0)).toFixed(2);
    if (sum !== totalExpenses) {
      this.setState({
        totalExpenses: sum,
      });
    }
  }

  render() {
    const { totalExpenses, currency } = this.state;
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
            <p data-testid="header-currency-field">{currency}</p>
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
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAPIData: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.shape(
    {
      email: PropTypes.string,
    },
  ).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getAPIData: PropTypes.func.isRequired,
};
