import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Header } from '../components/Index';
import SpendTable from '../components/SpendTable';
import { fetchCurrencies as fetchCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <SpendTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  // currencies: PropTypes.arrayOf(String).isRequired,
};
