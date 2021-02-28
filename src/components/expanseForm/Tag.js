import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
  render() {
    const { tag, onChange } = this.props;
    return (
      <label className="div-form" htmlFor="tag">
        Tag:
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ onChange }
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

export default Tag;

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
