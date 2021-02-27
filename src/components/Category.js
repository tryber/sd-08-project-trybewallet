import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { datatestid, name, onChange } = this.props;
    return (
      <select onChange={ onChange } name={ name } data-testid={ datatestid }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }
}

Category.propTypes = {
  datatestid: PropTypes.string.isRequired,
};

export default Category;
