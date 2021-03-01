import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getCurrenciesSymbol } from '../../actions';
import WalletHeader from '../../components/WalletHeader';
import WalletExpense from '../../components/WalletExpense';
import WalletExpenseForm from '../../components/WalletExpenseForm';
import './style.css';
import WalletExpenseEdit from '../../components/WalletExpenseEdit';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesSymbol } = this.props;
    fetchCurrenciesSymbol();
  }

  render() {
    const { isExpenseEdit } = this.props;
    return (
      <div className="walletContainer">
        <WalletHeader />
        {isExpenseEdit && <WalletExpenseEdit />}
        {!isExpenseEdit && <WalletExpense />}

        <WalletExpenseForm />

      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { fetchCurrenciesSymbol: bindActionCreators(getCurrenciesSymbol, dispatch) };
}
function mapStateToProps({ wallet: { editExpense, isExpenseEdit } }) {
  return { editExpense, isExpenseEdit };
}

Wallet.propTypes = {
  fetchCurrenciesSymbol: PropTypes.func.isRequired,
  isExpenseEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
