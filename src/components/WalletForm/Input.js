import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { title, id, ...restProps } = this.props;
    const labelName = title && title[0].toUpperCase() + title.substring(1);
    return (
      <label htmlFor={ id }>
        {labelName}
        <input id={ id } { ...restProps } />
      </label>
    );
  }
}

Input.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Input.defaultProps = {
  title: null,
};

export default Input;
