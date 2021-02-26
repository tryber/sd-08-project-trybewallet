import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { changeExpense } from '../actions';

class ExpenseInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { changeExpense: changeExpenseAction } = this.props;
    changeExpenseAction(event.target.id, event.target.value);
  }

  render() {
    const { name, label, type, options } = this.props;

    if (type === 'select') {
      return (
        <label htmlFor={ name }>
          { `${label}: ` }
          <select
            name={ name }
            id={ name }
            data-testid={ `${name}-input` }
            onChange={ this.handleChange }
          >
            {options.map((option, index) => (
              <option
                key={ index }
                value={ option }
                data-testid={ option }
              >
                { option }
              </option>
            ))}
          </select>
        </label>
      );
    }

    return (
      <label htmlFor={ name }>
        { `${label}: ` }
        <input
          name={ name }
          id={ name }
          type={ type }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
        />
      </label>
    );
  }
}

ExpenseInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
  changeExpense: PropTypes.func.isRequired,
};

ExpenseInput.defaultProps = {
  type: 'text',
  options: null,
};

const mapDispatchToProps = {
  changeExpense,
};

export default connect(null, mapDispatchToProps)(ExpenseInput);
