import React from 'react';
import PropTypes from 'prop-types';

const SpendFormSelect = ({ inputOnChange, method, tag }) => (
  <>
    <label htmlFor="method">
      Método de pagamento:
      <select
        name="method"
        id="method"
        data-testid="method-input"
        onChange={ inputOnChange }
        value={ method }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    </label>
    <label htmlFor="tag">
      Tag:
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        onChange={ inputOnChange }
        value={ tag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    </label>
  </>
);

SpendFormSelect.propTypes = {
  inputOnChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SpendFormSelect;
