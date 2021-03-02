import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { children, name, onChange, value, ...othersProps } = this.props;
    return (
      <label htmlFor={ name }>
        {children}
        <input name={ name } onChange={ onChange } value={ value } { ...othersProps } />
      </label>
    );
  }
}

Input.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
