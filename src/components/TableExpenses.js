import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';
import TableItem from './table/TableItem';
import TableHead from './table/TableHead';

class TableExpenses extends Component {
  handleClick(e) {
    const { deleteExp } = this.props;
    console.log(e);
    deleteExp(e);
  }

  render() {
    const { expenses } = this.props;
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
  expenses: state.currency.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (e) => dispatch(deleteExpense(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
