import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueExpense: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    // this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.btnAddExpense = this.btnAddExpense.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formInput(valueExpense) {
    return (
      <label htmlFor="valueExpense">
        Valor da despesa:
        <input
          type="number"
          value={ valueExpense }
          name="valueExpense"
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

  formCurrency(currency, getCurrencies) {
    return (
      <label htmFor="currency">
        Selecione Moeda da Despesa:
        <select
          name="currency"
          value={ currency }
          data-testid="USD"
          onChance={ this.handleChange }
        >
          {/* { getCurrencies.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))} */}
        </select>
      </label>
    );
  }

  formMethod(method, methodOptions) {
    return (
      <label htmFor="method">
        Selecione Método de Pagamento:
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChance={ this.handleChange }
        >
          { methodOptions.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  formTag(tag, tagOptions) {
    return (
      <label htmFor="tag">
        Selecione a Categoria da Despesa:
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChance={ this.handleChange }
        >
          { tagOptions.map((el) => (
            <option key={ el } value={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  btnAddExpense() {
    console.log('clicou');
  }

  render() {
    const { valueExpense, description, currency, method, tag } = this.state;
    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    // const currencyOptions = (this.getCurrencies);
    const getCurrencies = async () => {
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(endpoint);
      return response.json();
    };

    return (
      <form>
        { this.formInput(valueExpense) }
        { this.formDescription(description) }
        { this.formCurrency(currency, getCurrencies) }
        { this.formMethod(method, methodOptions) }
        {this.formTag(tag, tagOptions) }
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
