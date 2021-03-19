import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expanseEditEnd } from '../actions';
import FormValueInput from './FormValueInput';
import FormDescriptionInput from './FormDescriptionInput';
import FormCurrencyInput from './FormCurrencyInput';
import FormMethodInput from './FormMethodInput';
import FormTagInput from './FormTagInput';

export default function FormEdit({ currency }) {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const { expenseId } = wallet;
  const [expanseValue, setExpanseValue] = useState(
    wallet.expenses[expenseId].value,
  );
  const [expanseDescription, setExpanseDescription] = useState(
    wallet.expenses[expenseId].description,
  );
  const [expanseCurrency, setExpanseCurrency] = useState(
    wallet.expenses[expenseId].currency,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    wallet.expenses[expenseId].method,
  );
  const [expenseCategory, setExpenseCategory] = useState(
    wallet.expenses[expenseId].tag,
  );
  const expanse = {
    id: expenseId,
    value: expanseValue,
    description: expanseDescription,
    currency: expanseCurrency,
    method: paymentMethod,
    tag: expenseCategory,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(expanseEditEnd(expanse));
  };
  return (
    <form onSubmit={ handleSubmit }>
      <FormValueInput
        setExpanseValueFuncProps={ setExpanseValue }
        expanseValueProps={ expanseValue }
      />
      <FormDescriptionInput
        setExpanseDescriptionFuncProps={ setExpanseDescription }
        expanseDescriptionProps={ expanseDescription }
      />
      <FormCurrencyInput
        setExpanseCurrencyFuncProps={ setExpanseCurrency }
        expanseCurrencyProps={ expanseCurrency }
        currencyProps={ currency }
      />
      <FormMethodInput
        setPaymentMethodFuncProps={ setPaymentMethod }
        paymentMethodProps={ paymentMethod }
      />
      <FormTagInput
        setExpenseCategoryFuncProps={ setExpenseCategory }
        expenseCategoryProps={ expenseCategory }
      />
      <button type="submit">Editar despesa</button>
    </form>
  );
}
