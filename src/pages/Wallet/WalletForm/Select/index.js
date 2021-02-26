import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

class Select extends Component {
  render() {
    const { title, id, options, children, ...restProps } = this.props;
    const labelName = title && title[0].toUpperCase() + title.substring(1);
    return (
      <label htmlFor={ id }>
        {labelName}
        <select id={ id } { ...restProps }>
          {children}
          {options.map((option, index) => (
            <Option key={ index } item={ option } />
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Select.defaultProps = {
  title: null,
};

export default Select;
