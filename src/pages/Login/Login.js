import React from 'react';
import { connect } from 'react-redux';

function Login({ user }) {
  return (
    <form>
      <input
        data-testid="email-input"
        type="text"
        placeholder="name@example.com"
      />
      <input
        data-testid="password-input"
        type="text"
        placeholder="atleast 6 characters"
      />
      <button
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.email,
  };
}

export default connect(mapStateToProps)(Login);
