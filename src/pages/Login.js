import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmailPass = this.verifyEmailPass.bind(this);
  }

  handleSubmit() {
    const { userLogged } = this.props;
    const { email } = this.state;
    userLogged(email);
  }

  handleChange(e) {
    const { target } = e;
    const { value } = target;
    const inputName = target.name;
    this.setState({ [inputName]: value });
  }

  verifyEmailPass() {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const passwords = 6;
    return re.test(email) && password.length >= passwords;
  }

  render() {
    const { email, password } = this.state;
    const { logged } = this.props;
    return (logged ? <Redirect to="/carteira" /> : (
      <div>

        <h1> Trybe Wallet</h1>

        <label htmlFor="email">
          Email
          <input
            placeholder="E-mail address"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            name="email"
          />
        </label>

        <label htmlFor="senha">
          SENHA
          <input
            placeholder="Password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
            name="password"
          />
        </label>

        <button
          type="submit"
          value=""
          disabled={ !this.verifyEmailPass() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>

      </div>)
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogged: (email) => dispatch(loginUser(email)),
});

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  userEmail: state.user.email,
});

Login.propTypes = {
  userLogged: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
