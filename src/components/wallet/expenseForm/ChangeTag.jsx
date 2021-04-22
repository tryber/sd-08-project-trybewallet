import React from 'react';
import PropTypes from 'prop-types';

function ChangeTag({ handleChange, value }) {
  const arrayOfTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  return (
    <>
      Tag:
      <select
        data-testid="tag-input"
        name="tag"
        value={ value }
        onChange={ handleChange }
      >
        {arrayOfTag.map((tag) => <option key={ tag }>{tag}</option>)}
      </select>
    </>
  );
}

ChangeTag.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;

export default ChangeTag;
