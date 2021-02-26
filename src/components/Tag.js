import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tag extends Component {
  render() {
    const { getFields, tag } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          onChange={ getFields }
          data-testid="tag-input"
          type="text"
          id="tag"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }
}
Tag.propTypes = {
  getFields: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};
export default Tag;
