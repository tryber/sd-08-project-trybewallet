import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emailAction, passwordAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isNotValid: true,
      redirector: false,
    };

    this.logValidation = this.logValidation.bind(this);
    // this.changePage = this.changePage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  logValidation() {
    const { password, email } = this.state;
    const minPass = 6;
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (password.length >= minPass && emailPattern.test(email)) {
      this.setState({
        isNotValid: false,
        errorMessage: '',
      });
    } else {
      this.setState({
        errorMessage: 'Qual é, bota um e-mail válido e uma senha do tamanho correto',
        isNotValid: true,
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const { handleEmail, handlePassword } = this.props;
    const { email, password } = this.state;
    // handleLogin({ email, password });
    handleEmail(email);
    handlePassword(password);
    this.setState({ redirector: true });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.logValidation();
    });
  }

  render() {
    const { errorMessage, isNotValid, redirector } = this.state;
    return (
      <div className="Login">
        <section className="login-inputs">
          <h1>Trybe Wallet Project</h1>
          <input
            id="email"
            type="text"
            name="email"
            onChange={ this.handleChange }
            placeholder="e-mail - exemplo@exemplo.com"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            onChange={ this.handleChange }
            placeholder="Password - 6 caracteres ou mais"
            data-testid="password-input"
            required
          />
          <span style={ { color: 'red' } }>{errorMessage}</span>
          <button
            type="button"
            data-testid="btn-login"
            onClick={ this.handleClick }
            disabled={ isNotValid }
          >
            Entrar
          </button>
          { redirector ? <Redirect to="/carteira" /> : ''}
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // handleLogin: (value) => dispatch(loginAction(value)),
  handleEmail: (value) => dispatch(emailAction(value)),
  handlePassword: (value) => dispatch(passwordAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
};
