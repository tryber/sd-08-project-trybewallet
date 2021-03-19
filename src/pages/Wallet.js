import React from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import CurrentExpenses from '../components/CurrentExpenses';

import { fetchCurrencies as fetchCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { userEmail, currencies, isLoading } = this.props;

    const availableCurrencies = currencies
      ? currencies.map((currency) => currency.currency) : [];

    return (
      <>
        <Header user={ userEmail } />
        <main>
          {
            isLoading
              ? <h1>Loading...</h1>
              : (
                <ExpenseForm
                  availableCurrencies={ availableCurrencies }
                />
              )
          }
          <CurrentExpenses />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
    }),
  ).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
