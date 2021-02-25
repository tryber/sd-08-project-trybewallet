import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div className="login-form-container">
        <form>
          <label
            htmlFor="email"
          >
            E-mail
            <input
              type="email"
              name="email"
              data-testid="email-input"
              required
            />
          </label>
          <label
            htmlFor="email"
          >
            Senha
            <input
              type="password"
              name="password"
              data-testid="password-input"
              minLength="6"
              required
            />
          </label>
          <Link to="/wallet">
            <button
              type="button"
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
