import React, { Component } from 'react';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.renderCoinList = this.renderCoinsList.bind(this);
    this.renderSelect = this.renderExpenseCoinsSelect.bind(this);
    this.renderPaymentSelect = this.renderPaymentSelect.bind(this);
    this.renderExpenseCategorySelect = this.renderExpenseCategorySelect.bind(this);
    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    this.renderCoinsList();
  }

  async renderCoinsList() {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    const coinsList = Object.values(coinsJson);
    const coinsCodeList = coinsList
      .filter((coin) => coin.codein !== 'BRLT')
      .map((coin) => coin.code);
    this.setState({ coins: coinsCodeList });
  }

  renderExpenseCoinsSelect() {
    const { coins } = this.state;
    return (
      <select data-testid="currency-input">
        {coins === []
          ? <option>carregando</option>
          : coins.map((coin) => (
            <option
              data-testid={ `${coin}` }
              key={ coin }
            >
              { coin }
            </option>))}
      </select>
    );
  }

  renderPaymentSelect() {
    return (
      <select data-testid="method-input">
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
    );
  }

  renderExpenseCategorySelect() {
    return (
      <select data-testid="tag-input">
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  render() {
    return (
      <div>
        <form>
          <section style={{display:'inline-block'}}>
            <span>Valor</span>
            <input type="text" data-testid="value-input" />
          </section>
          <span>Descrição</span>
          <input type="text" data-testid="description-input" />
          <span>Moeda</span>
          {this.renderExpenseCoinsSelect()}
          <span>Método de pagamento</span>
          {this.renderPaymentSelect()}
          <span>Tipo</span>
          {this.renderExpenseCategorySelect()}
          <button type="button">Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

export default ExpensesForm;
