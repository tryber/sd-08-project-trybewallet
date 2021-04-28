import React from 'react';
import PropTypes from 'prop-types';

const FormsSelectCatergories = (props) => {
  const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const { handleInput } = props;
  return (
    <label htmlFor="tag">
      Category
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        onChange={ (e) => handleInput('tag', e.target.value) }
      >
        {categories.map((category, index) => (
          <option
            key={ index }
            id="tag"
            name="tag"
            value={ category }
          >
            {category}
          </option>))}
      </select>
    </label>
  );
};

FormsSelectCatergories.propTypes = {
  handleInput: PropTypes.func,
}.isRequired;

export default FormsSelectCatergories;
