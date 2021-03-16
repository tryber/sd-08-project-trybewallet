import React from 'react';
import PropTypes from 'prop-types';

export default function InputPassword(props) {
  const { state, setState } = props;

  function handleChange({ target }) {
    setState({ ...state, password: target.value });
  }

  return (
    <label htmlFor="password">
      Senha:
      <input
        type="password"
        name="password"
        onChange={ handleChange }
        data-testid="password-input"
      />
    </label>
  );
}

InputPassword.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  setState: PropTypes.func.isRequired,
};
