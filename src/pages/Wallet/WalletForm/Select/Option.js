import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
  render() {
    const { item, ...restProps } = this.props;
    return (
      <option
        data-testid={ item.code || item.name }
        value={ item.code || item.name }
        { ...restProps }
      >
        { item.name || item.code }
      </option>
    );
  }
}

Option.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Option;
