import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { actionLogin } from '../actions';

function validateEmail(email) { const re = /\S+@\S+\.\S+/; return re.test(email); }
// solution by Luiza Dilly
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      login: false,
      disabledBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginIsValid = this.loginIsValid.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.loginIsValid();
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { email } = this.state;
    const { login } = this.props;

    this.setState({ login: true });

    login(email);
  }

  loginIsValid() {
    const { email, password } = this.state;
    const MINLENGTH = 6;
    let disabledBtn = false;

    disabledBtn = !(password.length >= MINLENGTH && validateEmail(email));
    this.setState({ disabledBtn });
  }

  render() {
    const { email, password, login, disabledBtn } = this.state;

    return (
      <fieldset>
        <label htmlFor="email-input">
          E-mail:
          <input
            data-testid="email-input"
            value={ email }
            name="email"
            type="text"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            value={ password }
            name="password"
            type="password"
            minLength="6"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ disabledBtn }
        >
          Entrar
        </button>
        {login ? <Redirect to="/carteira" /> : ''}
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actionLogin(payload)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
