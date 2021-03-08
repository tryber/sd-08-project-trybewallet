import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FormExpanse from '../components/FormExpanse';
import { fetchCurrencies as fetchCurrenciesAction } from '../actions/Wallet';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;

    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <FormExpanse />
        <ExpenseTable />
      </div>);
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (currencies) => dispatch(fetchCurrenciesAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
