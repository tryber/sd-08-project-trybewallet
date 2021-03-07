import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import AddExpenseForm from '../components/AddExpenseForm';
import Header from '../components/Header';
import { Creators as WalletActions } from '../actions/wallet';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <AddExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(null, mapDispatchToProps)(Wallet);
