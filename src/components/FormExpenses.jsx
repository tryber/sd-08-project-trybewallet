import React, { Component } from 'react';

const moeda = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
  'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
export default class FormExpenses extends Component {
  render() {
    return (
      <div>
        <form action="">
          <input placeholder="" type="number" data-testid="value-input" />
          <input placeholder="" type="text" data-testid="description-input" />
          <select data-testid="currency-input">
            <option selected value="BRA">BRA</option>
            { moeda.map(
              (element) => (<option key={ element } value={ element }>{element}</option>),
            )}
          </select>
          <select data-testid="method-input">
            <option selected value="Dinheiro">Dinheiro</option>
            <option selected value="Cartão de crédito">Cartão de crédito</option>
            <option selected value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option selected value="Alimentação">Alimentação</option>
            <option selected value="Lazer">Lazer</option>
            <option selected value="Trabalho">Trabalho</option>
            <option selected value="Transporte">Transporte</option>
            <option selected value="Saúde">Saúde</option>
          </select>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}
