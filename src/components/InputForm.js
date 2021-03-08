import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';

class InputForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.expenseValueInput = this.expenseValueInput.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  expenseValueInput(value) {
    return (
      <TextInput
        htmlFor="value-input"
        labelText="Valor:"
        id="value-input"
        name="value"
        type="text"
        value={ value.toString() }
        onChange={ this.onChange }
        dataTestId="value-input"
        placeholder="$"
      />
    );
  }

  render() {
    const { value } = this.state;
    return (
      <form>
        { this.expenseValueInput(value) }
      </form>
    );
  }
}

export default connect(null, null)(InputForm);
