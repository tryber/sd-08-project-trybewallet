import React from 'react';
import PropTypes from 'prop-types';

class Tag extends React.Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select data-testid="tag-input" id="tag" onChange={ func }>
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
  func: PropTypes.func.isRequired,
};

export default Tag;
