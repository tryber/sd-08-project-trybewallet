import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrency, actionExpense, actionSaveEdited } from '../../actions/wallet';
import { fetchCurrencies } from '../../services/api';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    const { expenses, editId } = this.props;
    const expense = expenses.filter((item) => item.id === editId);
    const { id, currency, value, description, tag, method } = expense[0];

    this.state = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };
  }

  async componentDidMount() {
    const currencies = await fetchCurrencies();
    const { saveCurrencyList } = this.props;
    saveCurrencyList(currencies);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleEdit(event) {
    event.preventDefault();

    const { expenses, editId, saveEditedExpense } = this.props;
    const editItem = expenses.filter((item) => item.id === editId);
    const { id, description, tag, method, currency, value } = this.state;
    const { exchangeRates } = editItem[0];
    const editedExpense = {
      id,
      description,
      tag,
      method,
      currency,
      value,
      exchangeRates,
    };

    saveEditedExpense(editedExpense);
  }

  renderMethodTagDescriptionEdit() {
    const { description, tag, method } = this.state;
    return (
      <>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            id="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  renderInputEdit() {
    const { currencies } = this.props;
    const { currency, value } = this.state;
    return (
      <>
        <label htmlFor="value-input">
          Valor:
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((item) => (
              <option data-testid={ item } key={ item }>{item}</option>
            ))}
          </select>
        </label>
        {this.renderMethodTagDescriptionEdit()}
        <button type="submit" onClick={ this.handleEdit }>Editar despesa</button>
      </>
    );
  }

  render() {
    return (
      <div>
        {this.renderInputEdit()}
      </div>
    );
  }
}

EditForm.propTypes = {
  saveCurrencyList: PropTypes.func,
  saveExpense: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, expenses, edit, editId } }) => ({
  currencies,
  expenses,
  edit,
  editId,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencyList: (currencies) => dispatch(
    actionCurrency(currencies),
  ),
  saveExpense: (newExpense) => dispatch(
    actionExpense(newExpense),
  ),
  saveEditedExpense: (editedExpense) => dispatch(
    actionSaveEdited(editedExpense),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
