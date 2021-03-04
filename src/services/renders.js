import React from 'react';

export function renderInput(...args) {
  const [label, type, name, value, handleChange] = args;
  return (
    <label htmlFor="value-input">
      {`${label}:`}
      <input
        type={ type }
        id={ `${name}-input` }
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ handleChange }
        value={ value }
      />
    </label>
  );
}

export function renderSelectCurrencies(currenciesName, value, handleChange) {
  return (
    <select
      id="currency-input"
      name="currency"
      data-testid="currency-input"
      onChange={ handleChange }
      value={ value }
    >
      {currenciesName.map((currency) => {
        if (currency === 'USDT') return;
        return (
          <option key={ currency } data-testid={ currency }>
            {currency}
          </option>
        );
      })}
    </select>
  );
}

export function renderSelect(...args) {
  const [label, name, value, handleChange, options] = args;
  return (
    <label htmlFor={ `${name}-input` }>
      {`${label}: `}
      <select
        id={ `${name}-input` }
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ handleChange }
        value={ value }
      >
        {options.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function renderExpensesTable(expenses) {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => {
          const { description, tag, method, value, currency, exchangeRates } = expense;
          const { name, ask } = exchangeRates[currency];
          return (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>{(ask * parseInt(value, 10)).toFixed(2)}</td>
              <td>Real</td>
              <td>Excluir</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
