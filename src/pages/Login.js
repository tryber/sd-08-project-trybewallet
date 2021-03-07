import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.Click = this.Click.bind(this);
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

  Click() {
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
    const f = false;
    const e = 'Entrar';
    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            onChange={ this.hundleEmailOnChange }
            type="text"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            id="senha"
            onChange={ this.hundlePasswordOnChange }
            type="password"
            data-testid="password-input"
          />
        </label>
        { validationPassword || validationEmail
          ? <button onClick={ this.Click } type="button" disabled>Entrar</button>
          : <button onClick={ this.Click } type="button" disabled={ f }>{e}</button>}

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

Login.propTypes = {
  history: PropTypes.func.isRequired,
  addUser: PropTypes.string.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
