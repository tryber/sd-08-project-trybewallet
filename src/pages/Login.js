import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { PropTypes } from 'prop-types';
import saveEmail from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      validateEmail: false,
      validatePassword: false,
      email: '',
    };
  }

  handleChangeEmail({ target }) {
    const { validateEmail, email } = this.state;
    this.setState({
      validateEmail: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(target.value),
      email: target.value,
    }, () => {
      console.log(validateEmail, email);
    });
  }

  handleChangePassword({ target }) {
    const { validatePassword } = this.state;
    const MIN_CHARACTER = 5;
    this.setState({
      validatePassword: target.value.length > MIN_CHARACTER,
    }, () => {
      console.log(validatePassword);
    });
  }

  login() {
    const { email } = this.state;
    const { history, saveEmail } = this.props;
    history.push('/carteira');
    saveEmail(email);
  }

  render() {
    const { validatePassword, validateEmail } = this.state;
    return (
      <div className="login">
        <label htmlFor="email">
          <input
            onChange={ this.handleChangeEmail }
            id="email"
            placeholder="usuario@email.com"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          <input
            onChange={ this.handleChangePassword }
            id="senha"
            placeholder="********"
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ !(validatePassword && validateEmail) }
          onClick={ this.login }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (value) => dispatch(saveEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);
