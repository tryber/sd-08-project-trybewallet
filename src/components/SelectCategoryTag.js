import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategoryTag } from '../util/constantes';

class SelectCategoryTag extends Component {
  render() {
    const categoryTag = getCategoryTag();
    const { value, onChange } = this.props;

    return (
      <div>
        <label htmlFor="methodPayment">
          Categoria
          <select
            id="categoryTag"
            name="categoryTag"
            data-testid="tag-input"
            value={ value }
            onChange={ onChange }
          >
            {categoryTag.map((tag, index) => (
              <option
                key={ index }
                value={ tag }
              >
                { tag }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

SelectCategoryTag.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectCategoryTag;
