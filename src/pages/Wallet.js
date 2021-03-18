import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseForm from '../components/EditExpenseForm';

class Wallet extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        { editor ? <EditExpenseForm /> : <AddExpenseForm /> }
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

const mapStateToProps = (({ wallet }) => ({
  editor: wallet.editor,
}));

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
