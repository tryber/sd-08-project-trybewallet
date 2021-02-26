import React from 'react';
import PropTypes from 'prop-types';

export default function Form({
  currencies,
  setState,
  onSubmit,
  description,
  value,
  currency,
  method,
  tag,
  newExpense,
  editSubmit,
}) {
  return (
    <form>
      <label htmlFor="description-input">
        Despesa:
        <input
          type="text"
          id="description-input"
          className="input-expense description"
          data-testid="description-input"
          placeholder="descrição..."
          value={ description }
          name="description"
          onChange={ setState }
        />
      </label>
      <label htmlFor="value-input">
        Valor:
        <input
          min="0"
          type="number"
          id="value-input"
          className="input-expense value"
          data-testid="value-input"
          placeholder="0"
          value={ value }
          name="value"
          onChange={ setState }
        />
      </label>
      <div>
        <span>Moeda:</span>
        <select
          data-testid="currency-input"
          className="input-expense"
          value={ currency }
          name="currency"
          onChange={ setState }
        >
          <option value="">-</option>
          {currencies()}
        </select>
      </div>
      <div>
        <span>Método de pagamento:</span>
        <select
          data-testid="method-input"
          className="input-expense"
          value={ method }
          name="method"
          onChange={ setState }
        >
          <option value="">Selecione...</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>
      <div>
        <span>Tag:</span>
        <select
          data-testid="tag-input"
          className="input-expense"
          value={ tag }
          name="tag"
          onChange={ setState }
        >
          <option value="">Selecione...</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
      <div>
        {newExpense === true ? (
          <button
            type="button"
            className="add-expense"
            onClick={ onSubmit }
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            type="button"
            className="add-expense"
            onClick={ editSubmit }
          >
            Editar despesa
          </button>
        )}
      </div>
    </form>
  );
}

Form.propTypes = {
  currencies: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editSubmit: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  newExpense: PropTypes.bool.isRequired,
};
