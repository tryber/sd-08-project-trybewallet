import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TOTAL = 0;
function Header() {
  const total = useSelector((state) => state.wallet.total);
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);
  const currencies = useSelector((state) => state.wallet.currencies);
  // useEffect(() => {
  //   // expenses.length === 0 ? expenses.reduce((a, b) => a.value + b.value) : false;
  //   if (expenses.length > 0) return setTotal(expenses.reduce((a, b) => a.value + b.value));
  // }, [expenses]);
  // const [actualTotal, setActualTotal] = useState(0);
  // const reducer = (a.value, b.value) => a + b;
  // useEffect(() => {
  //   setActualTotal(() => total.reduce(reducer));
  // }, [total]);
  // useEffect(() => {
  //   total = total.reduce((a, b) => a + b);
  // }, [total]);

  return (
    <>
      <h1 data-testid="email-field">{email}</h1>
      {expenses.length === 0 ? <h2 data-testid="total-field">{TOTAL}</h2> : <h2 data-testid="total-field">{total}</h2> }
      <h3 data-testid="header-currency-field">{currencies}</h3>
    </>
  );
}

export default Header;
