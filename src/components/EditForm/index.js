import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Form from '../Form';
import { Creators as Actions } from '../../actions';

class EditForm extends React.Component {
  render() {
    const { editExpense, expenses, editId } = this.props;
    const placeHolder = expenses.find((expense) => expense.id === editId);
    return (
      <Form
        placeHolder={ placeHolder }
        onFormSubmit={ editExpense }
        buttonLabel="Editar despesa"
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  editExpense: wallet.editExpense,
  editId: wallet.editId,
});

EditForm.propTypes = {
  editExpense: PropTypes.func.isRequired,
  editId: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
