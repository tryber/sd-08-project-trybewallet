import React from 'react';
import WalletForm from '../components/WalletForm';

// TODO: configurar redux, criar lógica, criar planilha

function Wallet() {
  return (
    <>
      <header>
        <p data-testid="email-field">email</p>
        <p data-testid="total-field">despesa total: R$ 0</p>
        <p data-testid="header-currency-field">Moeda: BRL</p>
      </header>
      <main>
        <WalletForm />
      </main>
    </>);
}

export default Wallet;
