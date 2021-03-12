import React from 'react';
import PropTypes from 'prop-types';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';

class Select extends React.Component {
  render() {
    const { name, onChange, options, optionsName } = this.props;
    const id = `${name}-input`;
    const label = capitalizeFirstLetter(name);
    return (
      <label htmlFor={ id }>
        { `${label}: ` }
        <select
          name={ name }
          id={ id }
          onChange={ onChange }
          data-testid={ id }
        >
          { options.map((selectOption, index) => (
            <option
              key={ selectOption }
              data-testid={ selectOption }
              value={ selectOption }
            >
              { optionsName[index] }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  optionsName: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Select;
