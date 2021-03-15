import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { responseCurrencies,
  editedExpenseSave as ExpenseSaveAdd } from '../actions';

class EditExpense extends Component {
  constructor(props) {
    super(props);

    const { expenses, expenseId } = this.props;
    const expense = expenses.find((item) => item.id === expenseId);
    const { value, description, currency, method, tag, id, exchangeRates } = expense;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };

    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  onChangeInputs(field, newValue) {
    this.setState({ [field]: newValue });
  }

  async submitExpense() {
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    const { editedExpenseSave } = this.props;
    /*  const exchangeRates = await fetchApiCurrencies(); */

    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    editedExpenseSave(expense);
  }

  renderValue() {
    const { value } = this.state;
    return (
      <div>
        R$ Valor
        <input
          value={ value }
          type="number"
          data-testid="value-input"
          onChange={ (event) => this.onChangeInputs('value', event.target.value) }
        />
      </div>
    );
  }

  renderDescrip() {
    return (
      <div>
        Descrição da despesa
        <input
          defaultValue=""
          data-testid="description-input"
          onChange={ (event) => this.onChangeInputs('description', event.target.value) }
        />
      </div>
    );
  }

  renderCambio() {
    const { currencies } = this.props;

    const dropDownCurrencies = Object.keys(currencies || {});

    return (
      <div>
        Moeda/Cambio
        <select
          data-testid="currency-input"
          onChange={ (event) => this.onChangeInputs('currency', event.target.value) }
        >
          {dropDownCurrencies.map((currency) => {
            if (currency === 'USDT') return;
            return (
              <option key={ currency } data-testid={ currency }>{currency}</option>
            );
          })}
        </select>
      </div>
    );
  }

  renderMethod() {
    return (
      <div>

        Forma de pagamento
        <select
          data-testid="method-input"
          onChange={ (event) => this.onChangeInputs('method', event.target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
    );
  }

  rendertag() {
    return (
      <div>
        Categoria
        <select
          data-testid="tag-input"
          onChange={ (event) => this.onChangeInputs('tag', event.target.value) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

      </div>
    );
  }

  renderBtt() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.submitExpense }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  render() {
    return (
      <>
        <td>{ this.renderValue()}</td>
        <td>{ this.renderDescrip()}</td>
        <td>{ this.renderCambio()}</td>
        <td>{ this.renderMethod()}</td>
        <td>{ this.rendertag()}</td>
        <td>{ this.renderBtt()}</td>
      </>);
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies[0],
  expenses: state.wallet.expenses,
  expenseId: state.wallet.expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesRequest: () => dispatch(responseCurrencies()),
  editedExpenseSave: (expense) => dispatch(ExpenseSaveAdd(expense)),

});
export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
EditExpense.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object),
  expenseId: PropTypes.number.isRequired,
  editedExpenseSave: PropTypes.func.isRequired,
};

EditExpense.defaultProps = {
  currencies: [],
  expenses: [],
};
