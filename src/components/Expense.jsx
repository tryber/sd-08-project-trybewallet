import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpense, fetchCurrencies, getExchangeAndAddToExpense } from '../actions';

class Expense extends React.Component {
  constructor() {
    super();
    this.state = this.initState();
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.input = this.input.bind(this);
  }

  componentDidMount() {
    const { getCurrencyAction } = this.props;
    getCurrencyAction();
  }

  componentDidUpdate(prevProps) {
    const { isEditing } = this.props;
    const { isEditing: prevIsEditing } = prevProps;
    if (prevIsEditing < isEditing) this.updateEditInputs();
  }

  initState() {
    return {
      value: 0,
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  updateEditInputs() {
    const { expenses, isEditing } = this.props;
    const expense = expenses.find((exp) => exp.id === isEditing);
    this.setState(expense);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  input(name, label, type, ...options) {
    const { [name]: valueInput } = this.state;
    return (
      <label htmlFor={ name } key={ name }>
        {label}
        :
        { type !== 'select'
            && (
              <input
                type={ type }
                id={ name }
                value={ valueInput }
                onChange={ this.handleChange }
                data-testid={ `${name}-input` }
              />)}
        { type === 'select'
            && (
              <select
                id={ name }
                data-testid={ `${name}-input` }
                onChange={ this.handleChange }
                value={ valueInput }
              >
                {options[0]
                  .map((opt) => (
                    <option key={ opt } value={ opt } data-testid={ opt }>
                      {opt}
                    </option>))}
              </select>)}
      </label>
    );
  }

  submit(e) {
    e.preventDefault();
    const { addExpense, isEditing, edit, lastId } = this.props;
    const expense = this.state;
    if (isEditing >= 0) edit(expense);
    else addExpense(lastId + 1, expense);
    this.setState(this.initState());
  }

  render() {
    const { currencies, isEditing } = this.props;
    const optionsCurrency = currencies;
    const optionsMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const optionsTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const inputs = [['value', 'Valor', 'number'], ['description', 'Descrição', 'text'],
      ['currency', 'Moeda', 'select', optionsCurrency],
      ['method', 'Método', 'select', optionsMethod],
      ['tag', 'Categoria', 'select', optionsTag]];

    return (
      <form
        className={ `add-expense${isEditing >= 0 ? ' editing' : ''}` }
        onSubmit={ this.submit }
      >
        {inputs.map((input) => this.input(...input))}
        <button type="submit">
          { isEditing >= 0 ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </form>
    );
  }
}

Expense.propTypes = {
  getCurrencyAction: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  addExpense: PropTypes.func.isRequired,
  isEditing: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencyAction: () => dispatch(fetchCurrencies()),
  addExpense: (id, expense) => dispatch(getExchangeAndAddToExpense(id, expense)),
  edit: (data) => dispatch(editExpense(data)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.editingExpenseId,
  lastId: state.wallet.lastId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
