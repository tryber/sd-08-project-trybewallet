import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validated: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  loginValidation() {
    const { email, password } = this.state;
    const REGEX = /\S+@\S+\.\S+/;
    const PASSWORD_LENGTH = 6;
    const emailValidated = REGEX.test(email);
    const passwordValidated = password.length >= PASSWORD_LENGTH;
    if (emailValidated && passwordValidated) {
      return this.setState((state) => ({
        ...state, validated: true,
      }));
    }
    return this.setState((state) => ({
      ...state, validated: false,
    }));
  }

  handleClick() {
    this.setState(({ redirect: true }));
  }

  handleChange({ target: { name, value } }) {
    this.setState((state) => ({ ...state, [name]: value }), () => this.loginValidation());
  }

  render() {
    const { validated, redirect, email } = this.state;
    const { send } = this.props;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div className="d-flex height-100 justify-content-center bg-dark">
        <form
          className="box-radius border bg-info w-auto m-auto p-5 shadow"
        >
          <div>
            <label htmlFor="input">
              Email:
              <input
                data-testid="email-input"
                type="email"
                name="email"
                placeholder="digite seu email"
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
          </div>
          <div>
            <label htmlFor="input">
              Senha:
              <input
                data-testid="password-input"
                type="password"
                name="password"
                placeholder="digite sua senha"
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
          </div>
          <button
            className="btn btn-success"
            type="button"
            disabled={ !validated }
            onClick={ () => {
              send(email);
              this.handleClick();
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  send: (email) => dispatch(login.loginUser(email)),
});

Login.propTypes = {
  send: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
