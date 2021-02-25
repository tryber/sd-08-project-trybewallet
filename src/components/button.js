import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <button type="button">{ children }</button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
