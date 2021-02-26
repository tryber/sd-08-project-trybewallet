import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  render() {
    const { item, ...restProps } = this.props;
    return (
      <option value={ item } { ...restProps }>{item}</option>
    );
  }
}

Option.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Option;
