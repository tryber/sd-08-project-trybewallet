import PropTypes from 'prop-types';
import React from 'react';

export default function FormDescriptionInput({
  setExpanseDescriptionFuncProps,
  expanseDescriptionProps,
}) {
  return (
    <label htmlFor="description-input">
      Descrição:
      <input
        type="text"
        data-testid="description-input"
        name="description-input"
        id="description-input"
        onChange={ (e) => setExpanseDescriptionFuncProps(e.target.value) }
        value={ expanseDescriptionProps }
      />
    </label>
  );
}

FormDescriptionInput.propTypes = {
  expanseDescriptionProps: PropTypes.string.isRequired,
  setExpanseDescriptionFuncProps: PropTypes.func.isRequired,
};
