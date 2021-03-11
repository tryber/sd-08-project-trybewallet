import React from 'react';

function Wallet() {
  return (
    <>
      <header>
        <p data-testid="email-field">email</p>
        <p data-testid="total-field">despesa total: R$ 0</p>
        <p data-testid="header-currency-field">Moeda: BRL</p>
      </header>
      <main>
        <form>
          <label htmlFor="value-input">
            Valor da despesa:
            <input type="number" name="value-input" id="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição da despesa:
            <input type="text" data-testid="description-input" name="description-input" id="description-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda da despesa:
            <select name="currency-input" id="currency-input" data-testid="currency-input">
              <option value="USD" data-testid="USD">USD</option>
              <option value="CAD" data-testid="CAD">CAD</option>
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select name="method-input" id="method-input" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria da despesa:
            <select name="tag-input" id="tag-input" data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </main>
    </>);
}

export default Wallet;
