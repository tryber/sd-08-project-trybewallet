import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.inputChange = this.inputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  // entrada de dados dos input do name e value do input
  inputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleLogin() {
    const { setEmail, history } = this.props;
    const { email } = this.state;
    history.push('/carteira');
  }

  render() {
    return (
      <section>
        <h1>Trybe</h1>
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu E-mail"
            onChange={ this.inputChange }
          />
          <br />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Sua senha aqui"
            onChange={ this.inputChange }
          />
          <br />
          <button
            type="button"
            onClick={ this.handleLogin }
          >
            Entrar

          </button>
        </form>
      </section>
    );
  }
}

export default Login;
