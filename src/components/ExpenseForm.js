import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
  }

  async getCurrencies() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    return response.json();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formInput(value) {
    return (
      <label htmlFor="value">
        Valor da despesa:
        <input
          type="number"
          value={ value }
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  formDescription(description) {
    return (
      <label htmlFor="description">
        Descrição da Despesa:
        <textarea
          type="text"
          value={ description }
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  formCurrency(currency) {
    return (
      <label htmFor="currency">
        Selecione Moeda da Despesa:
        <select
          name="currency"
          value={ currency }
          data-testid="USD"
          onChance={ this.handleChange }
        >
          <option>teste</option>
          <option>teste2</option>
        </select>
      </label>
    );
  }

  formMethod(method) {
    return (
      <label htmFor="method">
        Selecione Método de Pagamento:
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChance={ this.handleChange }
        >
          <option>teste</option>
          <option>teste2</option>
        </select>
      </label>
    );
  }

  formTag(tag) {
    return (
      <label htmFor="tag">
        Selecione a Categoria da Despesa:
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChance={ this.handleChange }
        >
          <option>teste</option>
          <option>teste2</option>
        </select>
      </label>
    );
  }

  btnAddExpense() {
    console.log('clicou');
  }

  render() {
    const { value, description, currency, method, tag } = this.props;

    return (
      <form>
        { this.formInput(value) }
        { this.formDescription(description) }
        { this.formCurrency(currency) }
        { this.formMethod(method) }
        {this.formTag(tag) }
        <button
          type="button"
          onClick={ this.btnAddExpense }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

export default ExpenseForm;
