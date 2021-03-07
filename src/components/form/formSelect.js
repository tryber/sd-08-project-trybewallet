import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormSelect extends Component {
  render() {
    const { dataTestid, htmlFor, dataArray, label, handleChange } = this.props;
    return (
      <label htmlFor={ htmlFor }>
        {label}
        <select data-testid={ dataTestid } id={ htmlFor } name={ htmlFor } onChange={ (e) => handleChange(e) }>
          {dataArray
            .map((item) => (
              <option
                data-testid={ item }
                key={ `code-${item}` }
              >
                {item}
              </option>))}
        </select>
      </label>
    );
  }
}
FormSelect.propTypes = {
  dataTestid: PropTypes.func,
  htmlFor: PropTypes.func,
  dataArray: PropTypes.array,
  label: PropTypes.string,
}.isRequired;
