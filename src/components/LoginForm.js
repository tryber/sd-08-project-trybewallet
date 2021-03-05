import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../actions/user';
import '../styles/components/LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({ shouldRedirect: true });
  }

  validAcess() {
    const { email, password } = this.state;
    const number = 6; // número mínimo de caracteres
    if (password.length < number) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  }

  render() {
    const { email, password, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <div className="loginFormContainer">
        <form
          className="loginForm"
          onSubmit={ this.handleSubmit }
        >
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Seu e-mail"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="senha"
            onChange={ this.handleChange }
          />
          <button
            disabled={ !this.validAcess() }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToPros)(LoginForm);
