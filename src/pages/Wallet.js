import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import { Creators as WalletActions } from '../actions/index';
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
        <ExpenseForm />
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
