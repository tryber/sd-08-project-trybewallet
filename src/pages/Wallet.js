import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormularioDespesa from '../componetes/FormularioDespesa';
import Header from '../componetes/Header';
import { fetchCoin as fetchCoinAction } from '../actions/wallet';

class Wallet extends React.Component {
  async componentDidMount() {
    const { fetchCoin } = this.props;
    await fetchCoin();
  }

  render() {
    return (
      <div>
        <Header />
        <FormularioDespesa />
        <p>TrybeWallet</p>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCoin: () => dispatch(fetchCoinAction()),
});

Wallet.propTypes = {
  fetchCoin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
