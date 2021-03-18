import PropTypes from 'prop-types';
import React from 'react';
import FormValueInput from './FormValueInput';
import FormDescriptionInput from './FormDescriptionInput';
import FormCurrencyInput from './FormCurrencyInput';
import FormMethodInput from './FormMethodInput';
import FormTagInput from './FormTagInput';

export default function Form({
  handleSubmitFunc,
  setExpanseValueFunc,
  setExpanseDescriptionFunc,
  setExpanseCurrencyFunc,
  setPaymentMethodFunc,
  setExpenseCategoryFunc,
  expanseValue,
  expanseDescription,
  expanseCurrency,
  paymentMethod,
  expenseCategory,
  currency,
}) {
  return (
    <form onSubmit={ handleSubmitFunc }>
      <FormValueInput
        setExpanseValueFuncProps={ setExpanseValueFunc }
        expanseValueProps={ expanseValue }
      />
      <FormDescriptionInput
        setExpanseDescriptionFuncProps={ setExpanseDescriptionFunc }
        expanseDescriptionProps={ expanseDescription }
      />
      <FormCurrencyInput
        setExpanseCurrencyFuncProps={ setExpanseCurrencyFunc }
        expanseCurrencyProps={ expanseCurrency }
        currencyProps={ currency }
      />
      <FormMethodInput
        setPaymentMethodFuncProps={ setPaymentMethodFunc }
        paymentMethodProps={ paymentMethod }
      />
      <FormTagInput
        setExpenseCategoryFuncProps={ setExpenseCategoryFunc }
        expenseCategoryProps={ expenseCategory }
      />
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}

Form.propTypes = {
  currency: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  expanseCurrency: PropTypes.string.isRequired,
  expanseDescription: PropTypes.string.isRequired,
  expanseValue: PropTypes.number.isRequired,
  expenseCategory: PropTypes.string.isRequired,
  handleSubmitFunc: PropTypes.func.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  setExpanseCurrencyFunc: PropTypes.func.isRequired,
  setExpanseDescriptionFunc: PropTypes.func.isRequired,
  setExpanseValueFunc: PropTypes.func.isRequired,
  setExpenseCategoryFunc: PropTypes.func.isRequired,
  setPaymentMethodFunc: PropTypes.func.isRequired,
};
