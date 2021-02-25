import React from 'react';
import { connect } from 'react-redux';
import actionEmail from '../actions';

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
    setEmail(email);
    history.push('/carteira');
  }

  // https://github.com/tryber/sd-07-project-trybewallet/pull/17
  // foi pegado a logica para validar o campo do email e password
  // aluno Felipe Nascimento
  validate() {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minChars = 5;
    if (emailRegex.test(email) && password.length > minChars) {
      return false;
    }
    return true;
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
            disabled={ this.validate() }
            onClick={ this.handleLogin }
          >
            Entrar

          </button>
        </form>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(actionEmail(email)),
});
export default connect(null, mapDispatchToProps)(Login);
