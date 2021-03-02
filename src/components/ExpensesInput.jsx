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
import ExpensesTable from './ExpensesTable';

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
    this.editExpenseValue = this.editExpenseValue.bind(this);
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

  editExpenseValue(editionExp) {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = editionExp;

    this.setState({
      value,
      description,
      currency,
      method,
      tag,
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
        <section className="input-expenses-container">
          <InputExpenses value={ value } changeInput={ this.changeInput } />
          <InputDescription value={ description } changeInput={ this.changeInput } />
          <CurrenciesSelection value={ currency } changeInput={ this.changeInput } />
          <MethodSelection value={ method } changeInput={ this.changeInput } />
          <TagSelection value={ tag } changeInput={ this.changeInput } />
          <AddExpensesBtn resetInputs={ this.resetInputs } />
        </section>
        <section>
          <ExpensesTable editExpenseValue={ this.editExpenseValue } />
        </section>
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
