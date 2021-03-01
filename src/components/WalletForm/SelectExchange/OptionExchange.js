import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionExchange extends Component {
  render() {
    const { item, ...restProps } = this.props;
    return (
      <option
        value={ item }
        { ...restProps }
      >
        { item }
      </option>
    );
  }
}

OptionExchange.propTypes = {
  item: PropTypes.string.isRequired,
};

export default OptionExchange;
