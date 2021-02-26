import React, { useState } from 'react';

import CurrencySelect from './CurrencySelect';
import PayMethodSelect from './PayMethodSelect';
import TagSelect from './TagSelect';

function FormExpense() {
  return (
    <form>
      <label htmlFor="value">
        Valor:
        <input type="text" name="value" data-testid="value-input" />
      </label>
      <label htmlFor="description">
        Descrição:
        <input type="text" name="description" data-testid="value-input" />
      </label>
      <CurrencySelect />
      <PayMethodSelect />
      <TagSelect />
      <button type="button">Adicionar despesa</button>
    </form>
  );
}

export default FormExpense;
