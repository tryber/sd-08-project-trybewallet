import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../svg/045-wallet.svg';
import { storeEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      passLength: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  checkInputs() {
    const minPassLength = 6;
    const regexExpression = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    const { inputEmail, passLength } = this.state;
    const emailBool = regexExpression.test(inputEmail);
    if (passLength >= minPassLength && emailBool) {
      return true;
    }
    return false;
  }

  render() {
    const { propsStoreEmail } = this.props;
    const { inputEmail } = this.state;
    return (
      <div className="login-page">
        <section>
          <label htmlFor="userEmail">
            <span>Email</span>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              data-testid="email-input"
              value={ inputEmail }
              onChange={ ({ target }) => this.handleInput('inputEmail', target.value) }
            />
          </label>
          <label htmlFor="userPassword">
            <span>Senha</span>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              data-testid="password-input"
              onChange={
                ({ target }) => this.handleInput('passLength', target.value.length)
              }
            />
          </label>
          <button
            type="button"
            disabled={ !this.checkInputs() }
            onClick={ () => propsStoreEmail(inputEmail) }
          >
            Entrar
          </button>
          <div className="login-title">
            <h1>Deori</h1>
            <p>Wallet</p>
            <img src={ logo } alt="Wallet Logo" />
          </div>
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    propsStoreEmail: (email) => dispatch(storeEmail(email)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  propsStoreEmail: PropTypes.func.isRequired,
};
