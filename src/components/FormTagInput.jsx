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
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    </label>
  );
}

FormTagInput.propTypes = {
  expenseCategoryProps: PropTypes.string.isRequired,
  setExpenseCategoryFuncProps: PropTypes.func.isRequired,
};
