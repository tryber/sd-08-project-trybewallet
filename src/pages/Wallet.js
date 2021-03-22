import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as WalletActions } from '../actions/wallet';

import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import EditExpenseForm from '../components/EditExpenseForm';

class Wallet extends React.Component {
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

Wallet.defaultProps = {
  editor: false,
};

Wallet.propTypes = {
  editor: PropTypes.bool,
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  editor: wallet.editor,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(WalletActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
