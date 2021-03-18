import PropTypes from 'prop-types';
import React from 'react';

export default function FormTagInput({
  setExpenseCategoryFuncProps,
  expenseCategoryProps,
}) {
  return (
    <label htmlFor="tag-input">
      Categoria:
      <select
        name="tag-input"
        id="tag-input"
        data-testid="tag-input"
        onChange={ (e) => setExpenseCategoryFuncProps(e.target.value) }
        value={ expenseCategoryProps }
      >
        <option value="alimentacao">Alimentação</option>
        <option value="lazer">Lazer</option>
        <option value="trabalho">Trabalho</option>
        <option value="transporte">Transporte</option>
        <option value="saude">Saúde</option>
      </select>
    </label>
  );
}

FormTagInput.propTypes = {
  expenseCategoryProps: PropTypes.string.isRequired,
  setExpenseCategoryFuncProps: PropTypes.func.isRequired,
};
