import React from 'react';
import PropTypes from 'prop-types';

const ForlLabelDescri = (props) => {
  const { description, handleChange } = props;
  return (
    <label htmlFor="description">
      Descrição
      <input
        type="text"
        id="description"
        data-testid="description-input"
        value={ description }
        name="description"
        onChange={ handleChange }
      />
    </label>

  );
};

export default ForlLabelDescri;

ForlLabelDescri.propTypes = {
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,

};
