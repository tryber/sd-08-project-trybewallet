import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrenciesValuesAction,
  addExpenseWithCurrenciesAction,
  editExpenseAction,
  updateExpenseAction,
} from '../actions';

const INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    let data = null;
    const { editor, expenses, idToEdit } = this.props;
    if (editor) {
      data = expenses.find((expense) => expense.id === idToEdit);
    }

    this.state = {
      ...INITIAL_STATE,
      ...data,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleUpdateExpense = this.handleUpdateExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesValues } = this.props;
    fetchCurrenciesValues();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  handleUpdateExpense() {
    const { updateExpense } = this.props;
    updateExpense(this.state);
  }

  renderButton(editor) {
    return (
      <button
        type="button"
        onClick={ editor ? this.handleUpdateExpense : this.handleAddExpense }
        data-testid={ editor ? 'edit-btn' : 'add-btn' }
      >
        { editor ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    );
  }

  renderInput(name, label, type, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <input
          id={ `${name}-input` }
          type={ type }
          name={ `${name}` }
          data-testid={ `${name}-input` }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderSelectCurrencies(currencies, currency) {
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
        value={ currency }
      >
        { currencies.map((currentCurrency, index) => {
          if (currentCurrency !== 'USDT') {
            return (
              <option
                key={ index }
                value={ currentCurrency }
                data-testid={ `${currentCurrency}` }
              >
                {currentCurrency}
              </option>);
          }
          return '';
        })}
      </select>
    );
  }

  renderSelect(name, label, value, options) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <select
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
        >
          {options.map((option, index) => (
            <option key={ index }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <div>
        {this.renderInput('value', 'Valor', 'number', value)}
        {this.renderInput('description', 'Descrição', 'text', description)}
        {this.renderSelectCurrencies(currencies, currency)}
        {this.renderSelect('method', 'Meio de Pagamento', method, paymentOptions)}
        {this.renderSelect('tag', 'Tag', tag, tags)}
        {this.renderButton(editor)}
      </div>
    );
  }
}

ExpenseForm.defaultProps = {
  editor: false,
  idToEdit: 0,
};

ExpenseForm.propTypes = {
  fetchCurrenciesValues: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  addExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  idToEdit: PropTypes.number,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  expenses: wallet.expenses,
  idToEdit: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesValues: () => dispatch(fetchCurrenciesValuesAction()),
  addExpense: (expense) => dispatch(addExpenseWithCurrenciesAction(expense)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
  updateExpense: (expense) => dispatch(updateExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
