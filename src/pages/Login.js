import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form action="post">
        <fieldset>
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            min="6"
            required
          />
          <button type="submit">Entrar</button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
