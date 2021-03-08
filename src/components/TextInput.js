import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  render() {
    const { htmlFor, labelText, id, name, type, value, onChange,
      dataTestId, placeholder } = this.props;

    return (
      <label htmlFor={ htmlFor }>
        { labelText }
        <input
          type={ type }
          id={ id }
          name={ name }
          value={ value }
          onChange={ onChange }
          data-testid={ dataTestId }
          placeholder={ placeholder }
        />
      </label>
    );
  }
}

TextInput.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextInput;
