import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import handleInputsAction from '../actions/handleInputs';

import AddExpensesBtn from './AddExpensesBtn';
import InputExpenses from './InputExpenses';
import InputDescription from './InputDescription';
import CurrenciesSelection from './CurrenciesSelection';
import MethodSelection from './MethodSelection';
import TagSelection from './TagSelection';

class ExpensesInput extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.changeInput = this.changeInput.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
  }

  changeInput(event) {
    const { target: { name, value } } = event;
    const { handlingChange } = this.props;
    this.setState({
      [name]: value,
    });
    handlingChange(event);
  }

  resetInputs() {
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <>
        <InputExpenses value={ value } changeInput={ this.changeInput } />
        <InputDescription value={ description } changeInput={ this.changeInput } />
        <CurrenciesSelection value={ currency } changeInput={ this.changeInput } />
        <MethodSelection value={ method } changeInput={ this.changeInput } />
        <TagSelection value={ tag } changeInput={ this.changeInput } />
        <AddExpensesBtn resetInputs={ this.resetInputs } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

ExpensesInput.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpensesInput);
