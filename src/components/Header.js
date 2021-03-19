import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TOTAL = 0;
function Header() {
  // const [item, setItem] = useState(0);
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);
  const currencies = useSelector((state) => state.wallet.currencies);
  const total = useSelector((state) => state.wallet.total);
  // const [totall, setTotal] = useState(0);
  // const reducer = (a, b) => Number(a.value) * Number(a.exchangeRates[a.currency].ask) + (b.value) * Number(b.exchangeRates[b.currency].ask);

  // useEffect(() => {
  //   if (expenses.length > 0) return setTotal(() => expenses.reduce((reducer)));
  //   console.log(totall);
  // }, [expenses]);

  return (
    <>
      <h1 data-testid="email-field">{email}</h1>
      {expenses.length === 0 ? <h2 data-testid="total-field">{TOTAL}</h2> : <h1 data-testid="total-field">{total}</h1> }
      <h3 data-testid="header-currency-field">{currencies}</h3>
    </>
  );
}

export default Header;
