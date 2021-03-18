import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.go = this.go.bind(this);
    this.loginAccess = this.loginAccess.bind(this);
    this.passwordAccess = this.passwordAccess.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({
      redirect: true,
    });
  }

  go() {
    // feito com ajuda do site :https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e
    const { email } = this.state;
    const reg = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !reg;
  }

  passwordAccess() {
    const { password } = this.state;
    const length = 6;
    return password.length < length;
  }

  loginAccess() {
    return !(!this.go() && !this.passwordAccess());
  }

  render() {
    const { email, password, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <h2>Trybe Wallet</h2>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            placeholder="email"
            type="text"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            placeholder="senha"
            type="text"
            value={ password }
          />
        </label>
        <button
          onClick={ this.handleClick }
          disabled={ this.loginAccess() }
          type="button"
        >
          Entrar
        </button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
