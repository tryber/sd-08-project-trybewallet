import React from 'react';
import { connect } from 'react-redux';

function Header({ userEmail }) {
  return (
    <div>
      <h2 data-testid="email-field">
        { userEmail }
      </h2>
      <h2 data-testid="total-field">
        0
      </h2>
      <h2 data-testid="header-currency-field">
        BRL
      </h2>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
  };
}

export default connect(mapStateToProps, null)(Header);
