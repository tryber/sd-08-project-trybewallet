import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { name, value, dataTest, options, onChange, children } = this.props;
    return (
      <label htmlFor={ name }>
        { children }
        <select
          name={ name }
          value={ value }
          data-testid={ dataTest }
          onChange={ onChange }
        >
          {options.map((option) => (
            <option
              data-testid={ option }
              key={ option }
            >
              { option }
            </option>))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  options: PropTypes.shape(
    PropTypes.array.isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
