import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpense } from '../actions';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    const { editId, expenses } = this.props;
    const exp = expenses.find((expense) => expense.id === editId);
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    } = exp;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveExp } = this.props;
    const newExp = { ...this.state };
    saveExp(newExp);
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="despesas">
        Despesas:
        <input
          type="text"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescription() {
    const { descrição } = this.state;
    return (
      <label htmlFor="descrição">
        Despesas:
        <input
          type="text"
          name="description"
          value={ descrição }
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrency() {
    const { currencies } = this.props;
    return (
      <select data-testid="currency-input" name="currency" onChange={ this.handleChange }>
        {
          currencies.map((list, index) => (
            <option
              data-testid={ list }
              key={ index }
              value={ list }
            >
              { list }
            </option>))
        }
      </select>
    );
  }

  renderMethod() {
    return (
      <select data-testid="method-input" name="method" onChange={ this.handleChange }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderDespesas() {
    return (
      <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    return (
      <form>
        { this.renderValue() }
        { this.renderDescription() }
        { this.renderCurrency() }
        { this.renderMethod() }
        { this.renderDespesas() }
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExp: (newExp) => dispatch(saveExpense(newExp)),
});

EditForm.propTypes = {
  editId: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
  saveExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
