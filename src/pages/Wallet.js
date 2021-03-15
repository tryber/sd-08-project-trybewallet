import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import { fetchCurrencies as fetchCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <section>
        <Header />
        <ExpensesForm />
      </section>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (currencies) => dispatch(fetchCurrenciesAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
