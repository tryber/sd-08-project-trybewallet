import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, type, onChange, value } = this.props;
    const labelText = name.substring(0, 1).toUpperCase() + name.substring(1);
    return (
      <label htmlFor={ name }>
        { labelText }
        <input
          id={ name }
          name={ name }
          type={ type }
          onChange={ onChange }
          value={ value }
          data-testid={ `${name}-input` }
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
