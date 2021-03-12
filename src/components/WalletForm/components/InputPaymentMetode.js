import React from 'react';

export default function InputPaymentMetode() {
  return (
    <label htmlFor="PaymentMetode">
      Método de pagamento:
      <input
        name="PaymentMetode"
        data-testid="desciption-input"
      />
    </label>
  );
}
