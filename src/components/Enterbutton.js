import React from 'react';
import PropTypes from 'prop-types';

export default function Enterbutton({ disablecheck }) {
  return (
    <button
      type="button"
      disabled={ !disablecheck }
    >
      Entrar
    </button>
  );
}

Enterbutton.propTypes = {
  disablecheck: PropTypes.bool.isRequired,
};
