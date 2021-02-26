import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { PropTypes } from 'prop-types';
import { saveEmail } from '../actions/index';

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
    this.setState({
      validateEmail: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(target.value),
      email: target.value,
    }, () => {
    });
  }

  handleChangePassword({ target }) {
    const MIN_CHARACTER = 5;
    this.setState({
      validatePassword: target.value.length > MIN_CHARACTER,
    }, () => {
    });
  }

  login() {
    const { email } = this.state;
    const { history, saveEmailReducer } = this.props;
    history.push('/carteira');
    saveEmailReducer(email);
  }

  render() {
    const { validatePassword, validateEmail } = this.state;
    return (
      <main className="login-body">
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
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
  saveEmailReducer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailReducer: (value) => dispatch(saveEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);
