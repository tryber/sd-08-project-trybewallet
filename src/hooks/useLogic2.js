import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { expanseEditEnd } from '../actions';

function useLogic2() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const { expenseId } = wallet;
  const [expanseValue, setExpanseValue] = useState(
    wallet.expenses[expenseId].value,
  );
  const [expanseDescription, setExpanseDescription] = useState(
    wallet.expenses[expenseId].description,
  );
  const [expanseCurrency, setExpanseCurrency] = useState(
    wallet.expenses[expenseId].currency,
  );
  const [paymentMethod, setPaymentMethod] = useState(
    wallet.expenses[expenseId].method,
  );
  const [expenseCategory, setExpenseCategory] = useState(
    wallet.expenses[expenseId].tag,
  );
  const expanse = {
    id: expenseId,
    value: expanseValue,
    description: expanseDescription,
    currency: expanseCurrency,
    method: paymentMethod,
    tag: expenseCategory,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(expanseEditEnd(expanse));
  };
  return {
    handleSubmit,
    setExpanseValue,
    setExpanseDescription,
    setExpanseCurrency,
    setPaymentMethod,
    setExpenseCategory,
    expanseValue,
    expanseDescription,
    expanseCurrency,
    paymentMethod,
    expenseCategory,
  };
}

export default useLogic2;
