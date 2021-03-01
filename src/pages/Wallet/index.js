import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getCurrenciesSymbol } from '../../actions';
import WalletHeader from '../../components/WalletHeader';
import WalletExpense from '../../components/WalletExpense';
import './style.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesSymbol } = this.props;
    fetchCurrenciesSymbol();
  }

  render() {
    return (
      <div className="walletContainer">
        <WalletHeader />
        <WalletExpense />
        ...
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { fetchCurrenciesSymbol: bindActionCreators(getCurrenciesSymbol, dispatch) };
}

Wallet.propTypes = {
  fetchCurrenciesSymbol: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
