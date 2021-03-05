import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputExpense from './InputExpense';
import { fetchCurrency, finishEdit, addExpenses } from '../actions/wallet';

class AddExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
  }

  async componentDidMount() {
    const { fetchCurrency: fetchCurrencyAction } = this.props;
    await fetchCurrencyAction();
  }

  async handleAdd(e) {
    e.preventDefault();
    const {
      addExpenses: addExpensesAction,
      fetchCurrency: fetchCurrencyAction,
    } = this.props;
    await fetchCurrencyAction();
    addExpensesAction();
    e.target.parentNode.reset();
  }

  handleFinishEdit(e) {
    e.preventDefault();
    const { finishEdit: finishEditAction } = this.props;
    finishEditAction();
  }

  render() {
    const { edit, currencies } = this.props;
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
          name="description"
          label="Descrição"
        />
        <InputExpense
          name="tag"
          type="select"
          label="Categoria"
          options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
        />
        <InputExpense
          name="method"
          type="select"
          label="Método de Pagamento"
          option={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
        />
        <InputExpense
          name="value"
          label="Valor"
        />
        <InputExpense
          name="currency"
          type="select"
          label="Moeda"
          options={ currencies }
        />
        { btnExpense(edit) }
      </form>
    );
  }
}

AddExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
    .isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

AddExpenseForm.defaultProps = {
  edit: false,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = {
  fetchCurrency,
  addExpenses,
  finishEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
