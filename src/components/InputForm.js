import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from './TextInput';

class InputForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.expenseValueInput = this.expenseValueInput.bind(this);
    this.expenseDescriptionInput = this.expenseDescriptionInput.bind(this);
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

  expenseDescriptionInput(description) {
    return (
      <TextInput
        htmlFor="description-input"
        labelText="Descrição"
        id="description-input"
        name="description"
        type="text"
        value={ description }
        onChange={ this.onChange }
        dataTestId="description-input"
        placeholder="Qual a origem da despesa"
      />
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        { this.expenseValueInput(value) }
        <br />
        { this.expenseDescriptionInput(description) }
      </form>
    );
  }
}

export default connect(null, null)(InputForm);
