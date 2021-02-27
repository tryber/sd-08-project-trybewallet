import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import InputList from './InputList';
import TableTitles from './TableTitles';
import TableData from './TableData';
import { fetchCurrencies } from '../actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  calculateTotal() {
    const { expenses } = this.props;
    let sum = expenses.reduce((acc, curr) => {
      const convertedPrice = curr.value * curr.exchangeRates[curr.currency].ask;
      acc += convertedPrice;
      return acc;
    }, 0);
    sum = Math.floor(sum * 100) / 100;
    return sum;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <ul className="topnavDiv">
            <li><img src={ logo } alt="Logo" height="100px" /></li>
            <li data-testid="email-field">{`User: ${userEmail}`}</li>
            <li data-testid="total-field">
              {`Total Expenses: ${this.calculateTotal()}`}
            </li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <ul className="inputList">
          <InputList />
        </ul>
        <table>
          <TableTitles />
          <TableData />
        </table>
      </>
    );
  }
}
Wallet.propTypes = {
  userEmail: PropTypes.string,
  apiCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Wallet.defaultProps = {
  userEmail: 'a@a.ca',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
