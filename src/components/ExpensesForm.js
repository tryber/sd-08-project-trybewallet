import React, { Component } from 'react';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.renderForm = this.renderForm.bind(this);
  }

  renderForm() {
    const coins = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    return (
      <form>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select>
          { coins
            .map((coin, index) => (
              <option
                data-testid={ `${coin}` }
                key={ index + 1 }
              >
                {coin}
              </option>))}
        </select>
      </form>
    );
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default ExpensesForm;
