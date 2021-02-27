import React, { Component } from 'react';

import AddExpensesBtn from './AddExpensesBtn';
import InputExpenses from './InputExpenses';
import InputDescription from './InputDescription';
import CurrenciesSelection from './CurrenciesSelection';
import MethodSelection from './MethodSelection';
import TagSelection from './TagSelection';

class ExpensesInput extends Component {
  render() {
    return (
      <>
        <InputExpenses />
        <InputDescription />
        <CurrenciesSelection />
        <MethodSelection />
        <TagSelection />
        <AddExpensesBtn />
      </>
    );
  }
}

export default ExpensesInput;
