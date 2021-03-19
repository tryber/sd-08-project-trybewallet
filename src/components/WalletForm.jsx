import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import FormEdit from './FormEdit';
import useLogic from '../hooks/useLogic';
import getCurrency from '../services/index';

export default function WalletForm() {
  const {
    currency,
    setCurrency,
    setExpanseValue,
    setExpanseDescription,
    setExpanseCurrency,
    setPaymentMethod,
    setExpenseCategory,
    handleSubmit,
    currenciesSave,
    expanseValue,
    expanseDescription,
    expanseCurrency,
    paymentMethod,
    expenseCategory,
  } = useLogic();
  const isEditing = useSelector((state) => state.wallet.isEditing);
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrency().then((currencies) => {
      dispatch(currenciesSave(Object.keys(currencies)));
      setCurrency(Object.values(currencies));
    });
  }, [dispatch]);
  if (isEditing) {
    return (<FormEdit
      setExpanseValueFunc={ setExpanseValue }
      setExpanseDescriptionFunc={ setExpanseDescription }
      setExpanseCurrencyFunc={ setExpanseCurrency }
      setPaymentMethodFunc={ setPaymentMethod }
      setExpenseCategoryFunc={ setExpenseCategory }
      currency={ currency }
    />);
  }
  return (
    <Form
      handleSubmitFunc={ handleSubmit }
      setExpanseValueFunc={ setExpanseValue }
      setExpanseDescriptionFunc={ setExpanseDescription }
      setExpanseCurrencyFunc={ setExpanseCurrency }
      setPaymentMethodFunc={ setPaymentMethod }
      setExpenseCategoryFunc={ setExpenseCategory }
      expanseValue={ expanseValue }
      expanseDescription={ expanseDescription }
      expanseCurrency={ expanseCurrency }
      paymentMethod={ paymentMethod }
      expenseCategory={ expenseCategory }
      currency={ currency }
    />
  );
}
