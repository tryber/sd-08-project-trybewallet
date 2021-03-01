import React from 'react';
import WalletCurrencies from './WalletCurrencies';

class WalletForm extends React.Component {
  render() {
    return (
      <fieldset>
        <form>
          <label htmlFor="input-despesa">
            Adicione sua despesa
            <input
              type="number"
              placeholder="Quanto você gastou?"
              data-testid="value-input"
              id="input-despesa"
            />
          </label>
        </form>
        <form>
          <label htmlFor="descricao-despesa">
            Descreva sua despesa
            <textarea
              placeholder="Você gastou com o quê?"
              data-testid="description-input"
              id="descricao-despesa"
            />
          </label>
        </form>
        <WalletCurrencies />
        <form>
          <select data-testid="method-input">
            Forma de pagamento
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </form>
      </fieldset>
    );
  }
}

export default WalletForm;
