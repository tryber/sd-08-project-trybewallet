import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseCurr as expenseActions } from '../actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.payMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAddExpense() {
    const { addExpenseCurr } = this.props;
    addExpenseCurr(this.state);
    this.setState({ value: '' });
  }

  renderInput(value) {
    return (
      <input
        type="text"
        name="value"
        value={ value }
        data-testid="value-input"
        placeholder="Valor"
        onChange={ this.handleChange }
      />
    );
  }

  renderDescription(description) {
    return (
      <input
        type="text"
        name="description"
        value={ description }
        data-testid="description-input"
        placeholder="Descrição"
        onChange={ this.handleChange }
      />
    );
  }

  renderCurrency(currency) {
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ this.handleChange }
      >
        { currencies.map((curr) => (
          <option
            key={ curr }
            value={ curr }
            data-testid={ curr }
          >
            { curr }
          </option>
        ))}
      </select>
    );
  }

  renderMethod(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChange }
      >
        { this.payMethod.map((methods) => (
          <option key={ methods } value={ methods }>{ methods }</option>
        ))}
      </select>
    );
  }

  renderTag(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChange }
      >
        { this.expenseTags.map((tags) => (
          <option key={ tags } value={ tags }>{ tags }</option>
        ))}
      </select>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        { this.renderInput(value) }
        { this.renderDescription(description) }
        { this.renderCurrency(currency) }
        { this.renderMethod(method) }
        { this.renderTag(tag) }
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

const mapDispatchToProps = (dispatch) => ({
  addExpenseCurr: (curr) => dispatch(expenseActions(curr)),
});

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseCurr: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
