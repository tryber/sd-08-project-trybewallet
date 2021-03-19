import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCloseEditAction as walletCloseEdit } from '../walletActions';

class EditingForm extends Component {
  constructor(props) {
    super(props);

    const { expenses, expenseKey } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === expenseKey);
    const { description, id, tag, value,
      exchangeRates, method, currency } = expenseToEdit;
    this.state = {
      description,
      tag,
      id,
      value,
      exchangeRates,
      method,
      currency,
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderSelectCurrency = this.renderSelectCurrency.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  selectTag(value) {
    return (
      <label htmlFor="tag-input">
        <select
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ value }
          name="tag"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  selectMethod(value) {
    return (
      <label htmlFor="method-input">
        <select
          id="method-input"
          data-testid="method-input"
          value={ value }
          name="method"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  async submitEdit(event) {
    event.preventDefault();
    const { description, id, tag, value,
      exchangeRates, method, currency } = this.state;
    const { walletCloseEditAction } = this.props;
    const edittedExpense = {
      description,
      id,
      tag,
      value,
      exchangeRates,
      method,
      currency,
    };
    walletCloseEditAction(edittedExpense);
  }

  renderSelectCurrency(value) {
    const { currencies } = this.props;
    return (
      <select
        id="curency-input"
        value={ value }
        onChange={ this.handleChange }
        data-testid="currency-input"
        name="currency"
      >
        { currencies.map((curr) => {
          if (curr === 'USDT') return '';
          return (
            <option key={ curr } data-testid={ curr }>
              {curr}
            </option>);
        })}
      </select>
    );
  }

  render() {
    const { description, tag, value, method, currency } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            type="text"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
            name="value"
          />
        </label>
        <label htmlFor="description-input">
          Descrição da Despesa:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        { this.renderSelectCurrency(currency) }
        { this.selectMethod(method) }
        { this.selectTag(tag) }
        <button
          type="submit"
          onClick={ this.submitEdit }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseKey: state.wallet.expenseKey,
  editing: state.wallet.editing,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  walletCloseEditAction: (expense) => dispatch(walletCloseEdit(expense)),
});

EditingForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf().isRequired,
  expenseKey: PropTypes.string.isRequired,
  walletCloseEditAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditingForm);
