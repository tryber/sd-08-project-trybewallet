import React from 'react';
import PropTypes from 'prop-types';

const FormsInputs = (props) => {
  const { handleInput, value, description } = props;
  return (
    <>
      <label htmlFor="value">
        Outgoing
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-input"
          min={ 0.00 }
          step=".01"
          onChange={ (e) => handleInput('value', e.target.value) }
          value={ value }
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          name="description"
          id="description"
          data-testid="description-input"
          onChange={ (e) => handleInput('description', e.target.value) }
          value={ description }
        />
      </label>
    </>
  );
};

FormsInputs.propTypes = {
  handleInput: PropTypes.func,
}.isRequired;

export default FormsInputs;
