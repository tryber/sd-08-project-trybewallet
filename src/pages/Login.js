import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkEmailAndPassword = this.checkEmailAndPassword.bind(this);
  }

  validEmail(email) {
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    return isValidEmail;
  }

  validPassword(password) {
    const minimumPassword = 6;
    if (password.length >= minimumPassword) return true;
    return false;
  }

  checkEmailAndPassword() {
    const { email, password } = this.state;
    const emailIsValid = this.validEmail(email);
    const passwordIsValid = this.validPassword(password);
    return (emailIsValid && passwordIsValid);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState(
      { [name]: value },
      () => {
        if (this.checkEmailAndPassword()) this.setState({ disabledButton: false });
        else this.setState({ disabledButton: true });
      },
    );
  }

  render() {
    const { disabledButton, email } = this.state;
    const { dispatchEmailToState } = this.props;
    return (
      <div>
        Login
        <br />
        <label htmlFor="email_input">
          Email:
          <input
            id="email_input"
            type="text"
            name="email"
            placeholder="Insira seu e-mail"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password_input">
          Senha:
          <input
            id="password_input"
            type="text"
            name="password"
            placeholder="Insira sua senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabledButton }
            onClick={ () => dispatchEmailToState(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchEmailToState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmailToState: (userEmail) => dispatch(dispatchEmail(userEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
