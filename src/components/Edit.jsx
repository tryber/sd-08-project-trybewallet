import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateExpense as updateExpenseAction,
  changeEditStatus as changeEditStatusAction } from '../actions';

class Edit extends Component {
  constructor(props) {
    super(props);
    const { expenses, id } = props;
    const expense = expenses.find((item) => item.id === id);
    this.state = {
      expenses,
      value: expense.value || '',
      description: expense.description || '',
      currency: expense.currency || '',
      method: expense.method || '',
      tag: expense.tag || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateExpenses = this.updateExpenses.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  updateExpenses() {
    const { id } = this.props;
    const { expenses, value, description, currency, method, tag } = this.state;
    expenses[id] = { ...expenses[id], value, description, currency, method, tag, id };
    this.setState({ expenses });
  }

  renderFirstEditPart({ value, handleChange, currency }) {
    const { currencies } = this.props;
    return (
      <>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            value={ value }
            onChange={ handleChange }
            type="number"
            name="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ handleChange }
          >
            {currencies.length > 0 && currencies.map((item) => {
              if (item === 'USDT') return '';
              return (<option key={ item }>{item}</option>);
            })}
          </select>
        </label>
      </>
    );
  }

  renderSecondEditPart({ method, handleChange, tag, description }) {
    return (
      <>
        <label htmlFor="method">
          Método de pagamento
          <select
            value={ method }
            name="method"
            data-testid="method-input"
            id="method"
            onChange={ handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Gastou com
          <select
            onChange={ handleChange }
            value={ tag }
            name="tag"
            id="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            value={ description }
            onChange={ handleChange }
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>
      </>
    );
  }

  render() {
    const { handleChange } = this;
    const { updateReduxExpenses, changeEditStatus } = this.props;
    const { expenses } = this.state;
    const { value, description, currency, method, tag } = this.state;
    const infoOne = { value, handleChange, currency };
    const infoTwo = { method, handleChange, description, tag };
    return (
      <>
        {this.renderFirstEditPart(infoOne)}
        {this.renderSecondEditPart(infoTwo)}
        <button
          type="button"
          onClick={ () => {
            this.updateExpenses();
            updateReduxExpenses(expenses);
            changeEditStatus();
          } }
        >
          Editar despesa
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses, currencies }, edit: { id } }) => ({
  expenses,
  id,
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateReduxExpenses: (expenses) => dispatch(updateExpenseAction(expenses)),
  changeEditStatus: (id, edit) => dispatch(changeEditStatusAction(id, edit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

Edit.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  updateReduxExpenses: PropTypes.func.isRequired,
  changeEditStatus: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

Edit.defaultProps = {
  currencies: [],
};
