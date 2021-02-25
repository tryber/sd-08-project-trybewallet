import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <section>
        <h2>carteira</h2>
        <div data-testid="email-field" />
        <div data-testid="total-field">
          0
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>

      </section>
    );
  }
}

export default Header;
