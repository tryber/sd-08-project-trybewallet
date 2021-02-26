import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, resolveNewExpense } from '../actions';
import CurrencySelector from '../components/CurrencySelector';
import ExpensesTable from '../components/ExpensesTable';
import PaymentMethod from '../components/PaymentMethod';
import SelectExpenseType from '../components/SelectExpenseType';
import WalletHeader from '../components/WalletHeader';

export default function Wallet() {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState();
  const [didMount, setDidMount] = useState(false);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [method, setMethod] = useState('');
  const id = useSelector((state) => state.wallet.id);

  if (!didMount) {
    dispatch(fetchData());
  }

  useEffect(() => {
    setDidMount(true);
  }, []);

  async function addExpense(e) {
    e.preventDefault();
    const expense = { id, currency, value, description, tag, method };
    dispatch(resolveNewExpense(expense));
    document.getElementsByName('register-expense')[0].reset();
  }

  return (
    <div className="container">
      <WalletHeader />
      <form name="register-expense">
        <input
          data-testid="value-input"
          placeholder="valor"
          type="number"
          onChange={ (e) => setValue(e.target.value) }
        />
        <input
          data-testid="description-input"
          placeholder="descrição"
          onChange={ (e) => setDescription(e.target.value) }
        />
        <CurrencySelector setCurrency={ setCurrency } />
        <PaymentMethod setMethod={ setMethod } />
        <SelectExpenseType setTag={ setTag } />
        <button type="submit" onClick={ addExpense }>Adicionar despesa</button>
      </form>
      <ExpensesTable />
    </div>
  );
}
