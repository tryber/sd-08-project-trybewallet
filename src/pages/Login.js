import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loginAction from '../actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleButton() {
    const { email, password } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regex.test(email);
    const checkPassword = 6;
    if (validEmail && password.length >= checkPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  //  Nota Mental: setState recebe uma callback de segundo parâmetro que é executada a cada atualização do componente;
  handleInput({ target }) {
    this.setState({ [target.type]: target.value }, this.handleButton);
  }

  handleLogin(history) {
    const { email } = this.state;
    const { login } = this.props;
    history.push('/carteira');
    login(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    const { login } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ this.handleInput }
          required
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ this.handleInput }
          required
        />
        <Route
          render={ ({ history }) => (
            <button
              type="button"
              onClick={ () => {
                login(email);
                history.push('/carteira');
                // login(email);
              } }
              disabled={ disabled }
            >
              Entrar
            </button>) }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
