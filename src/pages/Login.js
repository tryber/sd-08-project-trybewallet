import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <section>
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu E-mail"
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Sua senha aqui"
          />
          <button type="button">Entrar</button>
        </form>
      </section>
    );
  }
}

export default Login;
