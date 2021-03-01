import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteExpenseAction from '../actions/deleteExpense';

class DeleteBtn extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete({ target }) {
    const { deleteExpense, expenses } = this.props;
    const newExpenses = expenses.filter((item) => item.id !== parseInt(target.id, 10));
    deleteExpense(newExpenses);
  }

  render() {
    const { id } = this.props;
    return (
      <button
        id={ id }
        type="button"
        onClick={ this.handleDelete }
        data-testid="delete-btn"
      >
        Excluir
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

DeleteBtn.propTypes = {
  id: PropTypes.number.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);
