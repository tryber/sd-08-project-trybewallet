import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Form from '../components/Form';
import { ActionsExpense } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  getTotal() {
    const { expenses } = this.props;
    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const currencyData = exchangeRates[currency];
        const total = Number(value) * Number(currencyData.ask);
        return total;
      })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">
            Valor Total:
            { (Math.round(this.getTotal() * 100) / 100).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">Câmbio: BRL</span>
        </header>
        <Form />
      </>

    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionsExpense, dispatch);

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
