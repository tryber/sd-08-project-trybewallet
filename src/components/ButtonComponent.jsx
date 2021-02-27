import { useHistory } from 'react-router-dom';
import React from 'react';

export default function ButtonComponent() {
  const history = useHistory();

  function handleClick() {
    history.push('/carteira');
  }

  return (
    <button type="button" onClick={ handleClick }>Entrar</button>
  );
}
