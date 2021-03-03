import React from 'react';
import './RegisterExpense.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoin, changeEdit, setExpenseEdit } from '../../actions';

class RegisterExpenditure extends React.Component {
  renderValueExpenditure(valueExpenditure, handleChange) {
    return (
      <div className="content-input-expenditure">
        <input
          value={ valueExpenditure }
          onChange={ handleChange }
          name="valueExpenditure"
          className="input-text input-value-expenditure"
          placeholder="Valor da despesa"
          data-testid="value-input"
          type="number"
        />
      </div>
    );
  }

  renderDescriptionExpenditure(descriptionExpenditure, handleChange) {
    return (
      <div className="content-input-expenditure">
        <input
          value={ descriptionExpenditure }
          onChange={ handleChange }
          name="descriptionExpenditure"
          className="input-text input-value-expenditure"
          placeholder="Descrição da despesa"
          data-testid="description-input"
          type="text"
        />
      </div>
    );
  }

  renderCurrencyChosen(currentCoin, handleChange) {
    const { wallet: { currencies } } = this.props;
    return (
      <div className="content-input-expenditure">
        <select
          value={ currentCoin }
          onChange={ handleChange }
          name="currentCoin"
          className="input-select input-value-expenditure"
          data-testid="currency-input"
          required
        >
          <option hidden defaultChecked value="">Selecione</option>
          { currencies
            ? currencies.map((el, index) => (
              <option
                key={ index }
                value={ el }
                data-testid={ el }
              >
                { el }
              </option>
            ))
            : <option>BRL</option>}
        </select>
      </div>
    );
  }

  renderPaymentMethod(paymentMethod, handleChange) {
    return (
      <div className="content-input-expenditure">
        <select
          value={ paymentMethod }
          onChange={ handleChange }
          name="paymentMethod"
          className="input-select
          input-value-expenditure"
          data-testid="method-input"
        >
          <option defaultValue="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
    );
  }

  renderExpenditureCategories(expenditureCategories, handleChange) {
    return (
      <div className="content-input-expenditure">
        <select
          value={ expenditureCategories }
          onChange={ handleChange }
          name="expenditureCategories"
          className="input-select input-value-expenditure"
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  renderButtonAdd(saveExpenses, getExpenses, resetForm) {
    return (
      <button
        onClick={ () => {
          saveExpenses(getExpenses());
          resetForm();
        } }
        className="btn-add-expenditure input-value-expenditure"
        type="button"
      >
        Adicionar despesa
      </button>
    );
  }

  renderButtonSaveEdit(editSet, editChange) {
    const {
      resetForm,
      setExpenses: saveEdit,
      wallet: { expenses },
      getExpenses } = this.props;
    return (
      <button
        onClick={ () => {
          saveEdit(expenses, getExpenses());
          editChange(editSet);
          resetForm();
        } }
        className="btn-add-expenditure input-value-expenditure btn-edit-expenditure"
        type="button"
      >
        Editar despesa
      </button>
    );
  }

  renderButtonAddExpenditure(getExpenses, saveExpenses) {
    const { resetForm, wallet: { editSet }, editChange } = this.props;
    const btnEdit = this.renderButtonSaveEdit(editSet, editChange);
    const btnAdd = this.renderButtonAdd(saveExpenses, getExpenses, resetForm);
    return (
      <div className="content-input-expenditure">
        {editSet
          ? btnEdit
          : btnAdd}
      </div>
    );
  }

  render() {
    const {
      valueExpenditure,
      descriptionExpenditure,
      currentCoin,
      paymentMethod,
      expenditureCategories,
      handleChange,
      getExpenses,
      saveExpenses,
    } = this.props;
    return (
      <main className="container-wallet">
        <form
          onSubmit={ (event) => event.preventDefault() }
          className="form-register-wallet"
        >
          { this.renderValueExpenditure(valueExpenditure, handleChange) }
          { this.renderDescriptionExpenditure(descriptionExpenditure, handleChange) }
          { this.renderCurrencyChosen(currentCoin, handleChange) }
          { this.renderPaymentMethod(paymentMethod, handleChange) }
          { this.renderExpenditureCategories(expenditureCategories, handleChange) }
          { this.renderButtonAddExpenditure(getExpenses, saveExpenses) }
        </form>
      </main>
    );
  }
}

RegisterExpenditure.propTypes = {
  wallet: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  valueExpenditure: PropTypes.string.isRequired,
  descriptionExpenditure: PropTypes.string.isRequired,
  currentCoin: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  expenditureCategories: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  editChange: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(getCoin(expenses)),
  editChange: (editSet) => dispatch(changeEdit(editSet)),
  setExpenses: (expenses, newExpense) => dispatch(setExpenseEdit(expenses, newExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExpenditure);
