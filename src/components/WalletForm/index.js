import React from 'react';
import InputValue from './components/InputValue';
import InputPaymentMetode from './components/InputPaymentMetode';
import InputCoin from './components/InputCoin';
import InputTag from './components/InputTag';
import InputDescription from './components/InputDescription';
import ButtonAddExpense from './components/ButtonAddExpense';

export default function index() {
  return (
    <>
      <InputValue />
      <InputCoin />
      <InputPaymentMetode />
      <InputTag />
      <InputDescription />
      <ButtonAddExpense />
    </>
  );
}
