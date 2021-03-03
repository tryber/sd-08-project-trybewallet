import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense, editExpense } from '../../../actions';
import Tbody from './SpendTable_Tbody';

const SpendTable = () => {
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const deleteExp = (id, expenses) => {
    dispatch(deleteExpense(id, expenses));
  };

  const editExp = (expense) => {
    dispatch(editExpense(expense));
  };

  const { expenses } = wallet;
  return (
    <div>
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
        <Tbody deleteExp={ deleteExp } editExp={ editExp } expenses={ expenses } />
      </table>
    </div>
  );
};

export default SpendTable;
