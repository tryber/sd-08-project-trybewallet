import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionsExpense } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    // this.resetState = this.resetState.bind(this);
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense() {
    const { addExpenseWithCurrencies } = this.props;
    addExpenseWithCurrencies(this.state);
    this.setState({ value: '' });
  }

  renderValueInput(value) {
    return (
      <label htmlFor="valueExpense">
        Custo
        <input
          type="number"
          id="valueExpense"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleInput }
        />
      </label>
    );
  }

  renderDescriptionInput(description) {
    return (
      <label htmlFor="despesa">
        Tarefa
        <input
          type="text"
          id="despesa"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleInput }
        />
      </label>
    );
  }

  renderCurrencyInput(currency) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ this.handleInput }
      >
        {currencies.map((item) => (
          <option
            key={ item }
            data-testid={ item }
          >
            {item}
          </option>
        ))}
      </select>
    );
  }

  renderMethodInput(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleInput }
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  renderTagInput(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleInput }
      >
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencyInput(currency) }
        { this.renderMethodInput(method) }
        { this.renderTagInput(tag) }
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWithCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionsExpense, dispatch);

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
