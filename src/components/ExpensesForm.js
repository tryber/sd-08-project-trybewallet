import React from 'react';

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.renderInput = this.renderInput.bind(this);
    this.handleChange = this.handleChange(this);

    const INITIAL_STATE = {
      value: '0',

    };
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  renderInput(label, type, name, value) {
    return (
      <label htmlFor={ `${name}-input` }>
        {`${label}: `}
        <input
          type={ type }
          id={ `${name}-input` }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          value={ value }
          className={ `${name}-input` }
        />
      </label>
    );
  }

  render() {
    const { value } = this.state;
    return (
      <form>
        { this.renderInput('VALOR', 'number', 'value', value) }

      </form>
    );
  }
}

export default ExpensesForm;
