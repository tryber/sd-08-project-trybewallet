import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import expense from '../../data/expense';
import './style.css';
import Select from './WalletForm/Select';
import Input from './WalletForm/Input';

class WalletExpense extends Component {
  render() {
    return (
      <main className="walletExpense">
        <Input
          title="valor"
          data-testid="value-input"
          type="number"
          name="coin"
          id="id-coin"
        />

        <Select
          title="moeda"
          data-testid="currency-input"
          type="text"
          name="currency"
          id="id-currency"
          options={ expense.cambio }
        />
        <Select
          title="tag"
          data-testid="tag-input"
          type="text"
          name="tag"
          id="id-tag"
          options={ expense.tag }
        />
        <Input
          title="descrição da despesa"
          data-testid="description-input"
          type="text"
          name="description"
          id="id-description"
        />
        <button type="button">Adicionar despesa</button>
      </main>
    );
  }
}

// WalletExpense.propTypes = {};

export default WalletExpense;
