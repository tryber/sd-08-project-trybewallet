import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
  render() {
    const { tag, onChange } = this.props;
    return (
      <label className="div-form" htmlFor="tag">
        Tag:
        {' '}
        <select
          name="tag"
          data-testid="tag-input"
          id="tag"
          value={ tag }
          onChange={ onChange }
        >
          <option id="Alimentação" value="Alimentação">Alimentação</option>
          <option id="Lazer" value="Lazer">Lazer</option>
          <option id="Trabalho" value="Trabalho">Trabalho</option>
          <option id="Transporte" value="Transporte">Transporte</option>
          <option id="Saúde" value="Saúde">Saúde</option>
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
