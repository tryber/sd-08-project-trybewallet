import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';
import TableItem from './table/TableItem';
import TableHead from './table/TableHead';

class TableExpenses extends Component {
  handleClick(e) {
    const { deleteExp } = this.props;
    deleteExp(e);
  }

  handleEdit(id) {
    const { edit } = this.props;
    // console.log(id);
    edit(id);
  }

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <table border="1px">
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {
            expenses.map((item) => (<TableItem
              key={ item.id }
              handleClick={ (e) => this.handleClick(e) }
              handleEdit={ (e) => this.handleEdit(e) }
              expense={ item }
            />))
          }
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (e) => dispatch(deleteExpense(e)),
  edit: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
