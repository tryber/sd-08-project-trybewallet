import React, { Component } from 'react';
import PropTypes from 'prop-types';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export default class SelectTag extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <select name="tag" data-testid="tag-input" onChange={ handleChange }>
        {
          tagList.map((tag) => (
            <option
              key={ tag }
              data-testid={ tag }
            >
              {tag}
            </option>))
        }
      </select>
    );
  }
}

SelectTag.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
