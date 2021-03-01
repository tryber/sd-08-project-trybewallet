import React from 'react';

class Categories extends React.Component {
  render() {
    const { datatestid, name, onChange, value } = this.props;
    return (
      <select
        onChange={ onChange }
        name={ name }
        data-testid={ datatestid }
        value={ value }
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

Categories.propTypes = {
  datatestid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Categories;
