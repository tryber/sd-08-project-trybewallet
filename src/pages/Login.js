import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true,
      password: '',
      redirect: false,
    };

    this.formValidation = this.formValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  formValidation() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const regexEmail = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const emailIsValid = regexEmail.test(email);
    const passwordIsValid = password.length >= PASSWORD_LENGTH;
    const disabled = !(emailIsValid && passwordIsValid);
    this.setState({
      disabled,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.formValidation());
  }

  handleClick() {
    const { email } = this.state;
    const { signIn } = this.props;
    signIn(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, disabled, redirect } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input
            type="text"
            name="email"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          { redirect ? <Redirect to="/carteira" /> : '' }
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signIn: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
};
