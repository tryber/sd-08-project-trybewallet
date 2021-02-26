import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

class Select extends Component {
  render() {
    const { title, id, options, children, ...restProps } = this.props;
    const isDataTestid = [restProps].some((prop) => prop === 'dataTestid');
    const labelName = title && title[0].toUpperCase() + title.substring(1);
    return (
      <label htmlFor={ id }>
        {labelName}
        <select id={ id } { ...restProps }>
          {children}
          {options.map((option, index) => (
            <Option
              key={ index }
              item={ option }
              data-testid={ isDataTestid ? option : null }
            />
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
  isDataTestid: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Select.defaultProps = {
  title: null,
  isDataTestid: false,
};

export default Select;
