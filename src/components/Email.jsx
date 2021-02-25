import React from 'react';
import PropTypes from 'prop-types';

export default function Email({ validateEmail }) {
  return (
    <div className="d-flex flex-row">
      <span className="input-group-text">Email</span>
      <input
        type="email"
        className="form-control"
        data-testid="email-input"
        onChange={ (e) => {
          validateEmail(e);
        } }
      />
    </div>
  );
}

Email.propTypes = {
  validateEmail: PropTypes.func.isRequired,
};
