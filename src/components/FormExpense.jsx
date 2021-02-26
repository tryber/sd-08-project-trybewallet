import React from 'react';

function FormExpense() {
  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input type="text" name="value" data-testid="value-input" />
      </label>
      <label htmlFor="description">
        Descrição:
        <input type="text" name="description" data-testid="value-input" />
      </label>
      <label htmlFor="currency">
        Moeda:
        <select name="currency" data-testid="currency-input">
          <option data-testid="USD" value="USD">USD</option>
          <option data-testid="CAD" value="CAD">CAD</option>
        </select>
      </label>
      <label htmlFor="method">
        Metodo de pagamento:
        <select name="method" data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag">
        Categoria da Despesa:
        <select name="tag" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <button type="button">Adicionar despesa</button>
    </form>
  );
}

export default FormExpense;
