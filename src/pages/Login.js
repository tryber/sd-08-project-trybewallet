import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              placeholder="digite seu email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              placeholder="digite sua senha"
              data-testid="password-input"
            />
            <button type="button">Entrar</button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
