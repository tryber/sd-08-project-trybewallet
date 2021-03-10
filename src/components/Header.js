import React, { Component } from 'react';
import store from '../store';

class Header extends Component {
  render() {
    return (
      <header>
        <p data-testid="email-field">
          {store.getState().user.email}
        </p>

      </header>
    );
  }
}

export default Header;
