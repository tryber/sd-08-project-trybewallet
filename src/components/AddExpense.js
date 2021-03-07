import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesAction } from '../actions/index';

const initialState = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    this.onFieldChange = this.onFieldChange.bind(this);
    this.addExpense = this.addExpense.bind(this);

    this.state = {
      ...initialState,
      id: 0,
    };
  }

  onFieldChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="expense-input">
        Valor da Despesa:
        <input
          id="expense-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.onFieldChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição da Despesa:
        <textarea
          id="description-input"
          name="description"
          value={ description }
          onChange={ this.onFieldChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    const allCurrencies = Object.keys(currencies);
    return (
      <label htmlFor="currency-input">
        Moeda usada:
        <select
          id="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.onFieldChange }
          data-testid="currency-input"
        >
          {allCurrencies.map((item) => {
            if (item === 'USDT') {
              return 'ignore';
            }
            return (
              <option key={ item } data-testid={ item }>
                {item}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          id="method-input"
          name="method"
          value={ method }
          onChange={ this.onFieldChange }
          data-testid="method-input"
        >
          {methods.map((item) => (
            <option key={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="currency-input">
        Categoria:
        <select
          id="currency-input"
          name="tag"
          value={ tag }
          onChange={ this.onFieldChange }
          data-testid="tag-input"
        >
          {tags.map((item) => (
            <option key={ item } className="tags">
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  async addExpense() {
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpense } = this.props;
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    saveExpense(expense);
    this.setState({
      ...initialState,
      id: id + 1,
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.valueInput()}
          {this.descriptionInput()}
          {this.currencyInput()}
          {this.methodInput()}
          {this.tagInput()}
          <button type="button" onClick={ this.addExpense }>Adicionar despesa</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(expensesAction(expense)),
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
