import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/header.css';

const Headers = ({ user }) => (
  <header>
    <h4>
      Email:
      <span data-testid="email-field">{ user }</span>
    </h4>
    <h4>
      Despesa total: R$
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </h4>
  </header>
);

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Headers.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Headers);
