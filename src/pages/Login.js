import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmail, savePassword } from '../actions';

function validEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const passwordLength = 6;

function validPassword(password) {
  return password.length >= passwordLength;
}

class Login extends React.Component {
  inputValidation() {
    const { email, password } = this.props;
    const emailValidation = validEmail(email);
    const passwordValidation = validPassword(password);

    if (emailValidation && passwordValidation) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, password, dispatchAddEmail, dispatchAddPassword } = this.props;

    return (
      <div>
        <h1>MYWALLET</h1>
        <label htmlFor="email-input">
          Email
          <input
            data-testid="email-input"
            name="email"
            onChange={ (e) => dispatchAddEmail(e.target.value) }
            placeholder="Write your email"
            value={ email }
            type="email"
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            data-testid="password-input"
            name="password"
            onChange={ (e) => dispatchAddPassword(e.target.value) }
            placeholder="password"
            value={ password }
            type="password"
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ this.inputValidation() }
            type="button"
            onClick={ () => dispatchAddEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddEmail: (email) => dispatch(saveEmail(email)),
  dispatchAddPassword: (password) => dispatch(savePassword(password)),
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
