import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h4 data-testid="email-field">email do login</h4>
          <h4 data-testid="total-field">Despesa Total</h4>
          <h4 data-testid="header-currency-field">Cambio usado</h4>
        </header>
      </div>
    );
  }
}

export default Wallet;
