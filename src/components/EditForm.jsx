import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpense } from '../actions';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.state = {
      ...props.expense,
    };
  }

  handleEditClick() {
    const { expenses, editCompleted, updateExpenses } = this.props;
    const { value, id, currency, method, description, tag } = this.state;
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense, value, currency, method, description, tag,
        };
      }
      return expense;
    });
    updateExpenses(updatedExpenses);
    editCompleted();
  }

  renderCurrencies() {
    const { currency, exchangeRates } = this.state;
    const currencies = Object.keys(exchangeRates);
    return (
      <select
        data-testid="currency-input"
        className="form-select"
        value={ currency }
        onChange={ (e) => this.setState({ currency: e.target.value }) }
      >
        <option value="" disabled hidden> </option>
        {currencies.map((element, index) => (
          <option
            key={ index }
            data-testid={ element }
            value={ element }
          >
            {element}
          </option>
        ))}
      </select>
    );
  }

  renderPaymentMethod() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        className="form-select"
        value={ method }
        onChange={ (e) => this.setState({ method: e.target.value }) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        className="form-select"
        value={ tag }
        onChange={ (e) => this.setState({ tag: e.target.value }) }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form className="expense-form bg-success text-white">

        <label htmlFor="value-input">
          Valor
          <input
            type="text"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => this.setState({ value: e.target.value }) }
          />
        </label>

        { this.renderCurrencies() }

        { this.renderPaymentMethod() }

        { this.renderTag() }

        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </label>

        <button
          type="button"
          className="btn btn-warning"
          data-testid="edit-btn"
          onClick={ this.handleEditClick }
        >
          Editar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(updateExpense(expenses)),
});

EditForm.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    method: PropTypes.string,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editCompleted: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
