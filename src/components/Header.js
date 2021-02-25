import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <div>email</div>
        <div>
          <input value="email" data-testid="email-field" />
        </div>
        <div>depesa total</div>
        <input value="0" data-testid="total-field" />
        <input value="BRT" data-testid="header-currency-field" />
      </div>
    );
  }
}

export default Header;
