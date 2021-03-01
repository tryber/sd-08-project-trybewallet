import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../actions';

const NUMERO_SEIS = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validationEmail: true,
      validationPassword: true,
    };

    this.emailValidation = this.emailValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.hundlePasswordOnChange = this.hundlePasswordOnChange.bind(this);
    this.hundleEmailOnChange = this.hundleEmailOnChange.bind(this);
    this.hundleonClick = this.hundleonClick.bind(this);
  }

  emailValidation() {
    const { email } = this.state;
    const validation = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!validation || email.length === 0) {
      this.setState({ validationEmail: true });
    } else {
      this.setState({ validationEmail: false });
    }
  }

  passwordValidation() {
    const { password } = this.state;
    if (password.length >= NUMERO_SEIS) {
      this.setState({ validationPassword: false });
    } else {
      this.setState({ validationPassword: true });
    }
  }

  hundleEmailOnChange(event) {
    this.setState({
      email: event.target.value,
    }, () => this.emailValidation());
  }

  hundleonClick() {
    const { history, addUser } = this.props;
    const { email } = this.state;
    addUser(email);
    history.push('/carteira');
  }

  hundlePasswordOnChange(event) {
    this.setState({
      password: event.target.value,
    }, () => this.passwordValidation());
  }

  render() {
    const { validationEmail, validationPassword } = this.state;

    return (
      <div>
        <label>E-mail</label>
        <input onChange={ this.hundleEmailOnChange } type="text" data-testid="email-input" />
        <label>Senha</label>
        <input onChange={ this.hundlePasswordOnChange } type="password" data-testid="password-input" />
        { validationPassword || validationEmail
          ? <button onClick={ this.hundleonClick } type="button" disabled={ true }>
            Entrar
          </button>
          : <button onClick={ this.hundleonClick } type="button" disabled={ false }>Entrar</button>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  readUser: state,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (value) => dispatch(userAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
