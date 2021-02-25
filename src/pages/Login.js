import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkEmailAndPassword = this.checkEmailAndPassword.bind(this);
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState(
      {
        [name]: value,
        isDisabled: true,
      },
      () => this.checkEmailAndPassword(),
    );
  }

  checkEmailAndPassword() {
    const minimumPasswordSize = 5;
    const { email, password } = this.state;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidPassword = password.length > minimumPasswordSize;
    if (isValidPassword && isValidEmail) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleClick() {
    const { email } = this.state;
    const { loggin } = this.props;
    loggin(email);
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { isDisabled, shouldRedirect } = this.state;
    return shouldRedirect ? (
      <Redirect to="/carteira" />
    ) : (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              placeholder="digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              placeholder="digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loggin: (email) => dispatch(Actions.logginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  loggin: PropTypes.func.isRequired,
};
