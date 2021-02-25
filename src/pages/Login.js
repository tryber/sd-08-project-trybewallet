import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

const passwordMinNumber = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValidation: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i,
    };
  }
  // fonte do regex: https://regexr.com/3e48o

  render() {
    const { email, password, emailValidation } = this.state;
    const { login } = this.props;
    return (
      <div className="Login">
        <section className="login-inputs">
          <input
            type="text"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            placeholder="email"
            data-testid="email-input"
          />
          <input
            type="password"
            onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder="senha"
            data-testid="password-input"
          />
        </section>
        <Link to="/carteira">
          <button
            disabled={
              !emailValidation.test(email)
              || password.length < passwordMinNumber
            }
            type="submit"
            onClick={ () => login({ email, password }) }
            data-testid="btn-login"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
