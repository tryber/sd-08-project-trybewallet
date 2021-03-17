import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getCurrency from '../services/index';
import { currenciesSave, expanseSave } from '../actions';

export default function WalletForm() {
  const [currency, setCurrency] = useState([]);
  const [id, setId] = useState(0);
  const [expanseValue, setExpanseValue] = useState(0);
  const [expanseDescription, setExpanseDescription] = useState('');
  const [expanseCurrency, setExpanseCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [expenseCategory, setExpenseCategory] = useState('alimentacao');
  const expanse = {
    id,
    value: expanseValue,
    description: expanseDescription,
    currency: expanseCurrency,
    method: paymentMethod,
    tag: expenseCategory,
  };
  const dispatch = useDispatch();

  const clearForm = () => {
    setExpanseValue(0);
    setExpanseDescription('');
    setExpanseCurrency('USD');
    setPaymentMethod('dinheiro');
    setExpenseCategory('alimentacao');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCurrency().then((currencies) => {
      const expansePlusExchangeRates = { ...expanse, exchangeRates: currencies };
      setId(id + 1);
      dispatch(expanseSave(expansePlusExchangeRates));
    });
    clearForm();
  };

  useEffect(() => {
    getCurrency().then((currencies) => {
      dispatch(currenciesSave(Object.keys(currencies)));
      setCurrency(Object.values(currencies));
    });
  }, [dispatch]);

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value-input">
        Valor da despesa:
        <input
          type="number"
          name="value-input"
          id="value-input"
          data-testid="value-input"
          onChange={ (e) => setExpanseValue(e.target.value) }
          value={ expanseValue }
        />
      </label>
      <label htmlFor="description-input">
        Descrição da despesa:
        <input
          type="text"
          data-testid="description-input"
          name="description-input"
          id="description-input"
          onChange={ (e) => setExpanseDescription(e.target.value) }
          value={ expanseDescription }
        />
      </label>
      <label htmlFor="currency-input">
        Moeda da despesa:
        <select
          name="currency-input"
          id="currency-input"
          data-testid="currency-input"
          onChange={ (e) => setExpanseCurrency(e.target.value) }
          value={ expanseCurrency }
        >
          {currency.map((item) => {
            if (item.name === 'Dólar Turismo') return '';
            return (
              <option value={ item.code } key={ item.code }>{item.code}</option>
            );
          })}
        </select>
      </label>
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method-input"
          id="method-input"
          data-testid="method-input"
          onChange={ (e) => setPaymentMethod(e.target.value) }
          value={ paymentMethod }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-credito">Cartão de crédito</option>
          <option value="cartao-debito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="tag-input">
        Categoria da despesa:
        <select
          name="tag-input"
          id="tag-input"
          data-testid="tag-input"
          onChange={ (e) => setExpenseCategory(e.target.value) }
          value={ expenseCategory }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
      <button type="submit">Adicionar despesa</button>
    </form>
  );
}
