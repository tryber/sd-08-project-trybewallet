import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as walletActions } from '../actions/wallet.action';
import Header from '../components/Header';
import ExpenseForm from '../components/FormExpense';
import ExpenseTable from '../components/expenseTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <header>
          <Header />
          <ExpenseForm />
          <ExpenseTable />
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(walletActions, dispatch);

export default connect(null, mapDispatchToProps)(Wallet);
