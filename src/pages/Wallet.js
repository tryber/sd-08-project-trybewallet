import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <>
      <header>
        <p data-testid="email-field">Email: via props</p>
        <p data-testid="total-field">Despesas totais 0</p>
        <p data-testid="header-currency-field">Mostrar o cambio BRL/outros</p>
      </header>
      </>
    );
  }
}

export default Wallet;
