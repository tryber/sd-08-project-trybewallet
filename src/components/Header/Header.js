import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
