import React from 'react';

import PropTypes from 'prop-types';

export default function SelectExpenseType({ setTag }) {
  return (
    <select data-testid="tag-input" onChange={ (e) => setTag(e.target.value) }>
      <option>Alimentação</option>
      <option>Lazer</option>
      <option>Trabalho</option>
      <option>Transporte</option>
      <option>Saúde</option>
    </select>
  );
}

SelectExpenseType.propTypes = {
  setTag: PropTypes.func.isRequired,
};
