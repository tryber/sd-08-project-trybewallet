import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../actions/requestCurrency';

class ExpensesInput extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currencies, fetchCurrencies } = this.props;
    return (
      <>
        <label htmlFor="expenses">
          Valor:
          <input name="expenses" type="number" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input name="description" type="text" data-testid="description-input" />
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

ExpensesInput.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesInput);
