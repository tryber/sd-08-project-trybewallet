import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { datatestid, name, onChange, value } = this.props;
    return (
      <select
        value={ value }
        onChange={ onChange }
        name={ name }
        data-testid={ datatestid }
      >
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
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Category;
