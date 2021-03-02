import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { expensesForm } from '../actions/wallet';

class InputExpense extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind.bind(this);
  }

  handleChange(e) {
    const { expensesForm: expensesFormAction } = this.props;
    expensesFormAction(e.target.id, e.target.value);
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
            data-testId={ `${name}-input` }
            onChange={ this.handleChange }
          >
            {options.map((option, index) => (
              <option
                key={ index }
                value={ option }
                data-testId={ option }
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
        { `${name}: ` }
        <input
          name={ name }
          id={ name }
          type={ type }
          data-testId={ `${name}-input` }
          onChange={ this.handleChange }
        />
      </label>
    );
  }
}

InputExpense.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf])),
  expensesForm: PropTypes.func.isRequired,
};

InputExpense.defaultProps = {
  type: 'text',
  options: null,
};

const mapDispatchToProps = {
  expensesForm,
};

export default connect(null, mapDispatchToProps)(InputExpense);
