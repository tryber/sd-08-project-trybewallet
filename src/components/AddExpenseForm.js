import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputExpense from './InputExpense';
import { fetchCurrencie, finishEdit, addExpenses } from '../actions/wallet';

class AddExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
  }

  async componentDidMount() {
    const { fetchCurrencie: fetchCurrencieAtcion } = this.props;
    await fetchCurrencieAtcion();
  }

  async handleAdd(e) {
    e.preventDefault();
    const {
      addExpenses: addExpensesAction,
      fetchCurrencie: fetchCurrencieAtcion,
    } = this.props;
    await fetchCurrencieAtcion();
    addExpensesAction();
    e.target.parentNode.reset();
  }

  handleFinishEdit(e) {
    e.preventDefault();
    const { finishEdit: finishEditAction } = this.props;
    finishEditAction();
  }

  render() {
    const { edit, currencie } = this.props;
    const btnExpense = (canEdit) => (
      <button
        type="submit"
        onClick={ canEdit ? this.handleFinishEdit : this.handleAdd }
      >
        { canEdit ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    );

    return (
      <form>
        <InputExpense
          name="value"
          label="Valor"
        />
        <InputExpense
          name="description"
          label="Descrição"
        />
        <InputExpense
          name="currency"
          label="Moeda"
          type="select"
          options={ currencie }
        />
        <InputExpense
          name="method"
          label="Método de Pagamento"
          type="select"
          option={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
        />
        <InputExpense
          name="tag"
          label="Categoria"
          type="select"
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
        />
        { btnExpense(edit) }
      </form>
    );
  }
}

AddExpenseForm.propTypes = {
  currencie: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
    .isRequired,
  fetchCurrencie: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

AddExpenseForm.defaultProps = {
  edit: false,
};

const mapStateToProps = (state) => ({
  currencie: state.wallet.currencie,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = {
  fetchCurrencie,
  addExpenses,
  finishEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
