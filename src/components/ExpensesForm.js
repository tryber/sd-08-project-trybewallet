import React, { Component } from 'react';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.renderForm = this.renderForm.bind(this);
    this.renderCoinList = this.renderCoinList.bind(this);
    this.renderSelect = this.renderSelect.bind(this);

    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    this.renderCoinList();
  }

  async renderCoinList() {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    console.log(coinsJson);
    const coinsList = Object.values(coinsJson);
    const coinsCodeList = coinsList
      .filter((coin) => coin.codein !== 'BRLT')
      .map((coin) => coin.code);
    this.setState({ coins: coinsCodeList });
  }

  renderSelect() {
    const { coins } = this.state;
    return (
      <select>
        {coins === []
          ? <option>carregando</option>
          : coins.map((coin) => <option key={ coin }>{ coin }</option>)}
      </select>
    );
  }

  renderForm() {
    return (
      <div>
        <form>
          <input type="text" data-testid="value-input" />
          <input type="text" data-testid="description-input" />
          {this.renderSelect()}
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default ExpensesForm;
