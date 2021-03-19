import PropTypes from 'prop-types';
import React from 'react';

export default function FormValueInput({ setExpanseValueFuncProps, expanseValueProps }) {
  return (
    <label htmlFor="value-input">
      Valor:
      <input
        type="number"
        name="value-input"
        id="value-input"
        data-testid="value-input"
        onChange={ (e) => setExpanseValueFuncProps(e.target.value) }
        value={ expanseValueProps }
      />
    </label>
  );
}

FormValueInput.propTypes = {
  expanseValueProps: PropTypes.number.isRequired,
  setExpanseValueFuncProps: PropTypes.func.isRequired,
};
