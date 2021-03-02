import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import editExpenseAction from '../actions/editExpense';

class EditBtn extends Component {
  constructor() {
    super();

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit({ target }) {
    const { id } = target;
    const { expenses, editExpense, editExpenseValue } = this.props;
    const editionExp = expenses.filter((elem) => elem.id === Number(id));
    editExpenseValue(editionExp[0]);
    editExpense(editionExp);
    return '';
  }

  render() {
    const { id } = this.props;
    return (
      <button
        id={ id }
        type="button"
        onClick={ this.handleEdit }
        data-testid="edit-btn"
        className="btn-expenses-container"
      >
        Editar
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (editionExp) => dispatch(editExpenseAction(editionExp)),
});

EditBtn.propTypes = {
  id: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpense: PropTypes.func.isRequired,
  editExpenseValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBtn);
