import React from 'react';
import PropTypes from 'prop-types';

export default function InputEmail(props) {
  const { state, setState } = props;

  function handleChange({ target }) {
    setState({ ...state, email: target.value });
  }

  return (
    <label htmlFor="email">
      E-mail:
      <input
        type="email"
        name="email"
        onChange={ handleChange }
        data-testid="email-input"
      />
    </label>
  );
}

InputEmail.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  setState: PropTypes.func.isRequired,
};
