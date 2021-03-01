import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionExpense extends Component {
  render() {
    const { item, ...restProps } = this.props;
    return (
      <option
        data-testid={ item }
        value={ item }
        { ...restProps }
      >
        { item }
      </option>
    );
  }
}

OptionExpense.propTypes = {
  item: PropTypes.string.isRequired,
};

export default OptionExpense;
