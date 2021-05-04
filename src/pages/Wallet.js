import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies as getCurrencies } from '../actions';
import { TabelaDespesa, Header, NovaDespesa } from '../components';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <main className="wallet-main">
        <Header />
        <NovaDespesa />
        <TabelaDespesa />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};
