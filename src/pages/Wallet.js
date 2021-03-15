import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import HeaderTable from './HeaderTable';
import FieldExpense from './FieldExpense';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import { responseCurrencies } from '../actions';

class Wallet extends Component {
  componentDidMount() {
    const { currenciesRequest } = this.props;
    currenciesRequest();
  }

  render() {
    const { editingExpense } = this.props;
    return (
      <span>

        <Header />
        {editingExpense ? <EditExpense /> : <AddExpense />}
        <table>
          <HeaderTable />
          <FieldExpense />
        </table>
      </span>);
  }
}

const mapStateToProps = (state) => ({
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesRequest: () => dispatch(responseCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  editingExpense: PropTypes.bool,
  currenciesRequest: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  editingExpense: false,
};
