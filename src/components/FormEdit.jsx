import PropTypes from 'prop-types';
import React from 'react';
import FormValueInput from './FormValueInput';
import FormDescriptionInput from './FormDescriptionInput';
import FormCurrencyInput from './FormCurrencyInput';
import FormMethodInput from './FormMethodInput';
import FormTagInput from './FormTagInput';
import useLogic2 from '../hooks/useLogic2';

export default function FormEdit({ currency }) {
  const {
    handleSubmit,
    setExpanseValue,
    setExpanseDescription,
    setExpanseCurrency,
    setPaymentMethod,
    setExpenseCategory,
    expanseValue,
    expanseDescription,
    expanseCurrency,
    paymentMethod,
    expenseCategory,
  } = useLogic2();

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

FormEdit.propTypes = {
  currency: PropTypes.shape({
    currency: PropTypes.string.isRequired,
  }).isRequired,
};
