import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: '',
      password: '',
      isComplete: false,
    };
  }

  handleEmailChange(event) {
    const minPasswordLength = 6;
    const { password } = this.state;
    if (
      event.target.value.includes('@')
      && event.target.value.includes('.com')
      && password >= minPasswordLength
    ) {
      this.setState({
        email: event.target.value,
        isComplete: true,
      });
    } else {
      this.setState({
        email: event.target.value,
        isComplete: false,
      });
    }
  }

  handlePasswordChange(event) {
    const minPasswordLength = 6;
    const { email } = this.state;
    if (
      email.includes('@')
      && email.includes('.com')
      && (event.target.value.length >= minPasswordLength)
    ) {
      this.setState({
        password: event.target.value,
        isComplete: true,
      });
    } else {
      this.setState({
        password: event.target.value,
        isComplete: false,
      });
    }
  }

  handleClick() {
    const { email } = this.state;
    const { history, saveLogin } = this.props;
    saveLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isComplete } = this.state;
    return (
      <main>
        <h2>Wallet Login</h2>
        <form>
          <label htmlFor="email-input">
            Email
            <br />
            <input
              type="text"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleEmailChange }
            />
          </label>
          <br />
          <label htmlFor="password-input">
            Senha
            <br />
            <input
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handlePasswordChange }
            />
          </label>
          <br />
          <button
            type="button"
            disabled={ !isComplete }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
