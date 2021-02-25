import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      validation: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { addLogin } = this.props;
    const { email } = this.state;
    addLogin(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((state) => ({
      ...state, [name]: value,
    }), () => this.validateEmail());
  }

  validateEmail() {
    const { email, senha } = this.state;
    const passwordLength = 6;
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const checkEmail = regex.test(email);
    const checkSenha = senha.length >= passwordLength;
    if (checkEmail && checkSenha) {
      return this.setState((state) => ({
        ...state, validation: true,
      }));
    }
    this.setState((state) => ({
      ...state, validation: false,
    }));
  }

  render() {
    const { loginOK } = this.props;
    const { email, senha, validation } = this.state;
    if (loginOK) return <Redirect to="/carteira" />;
    return (
      <div className="Login">
        <input
          name="email"
          value={ email }
          id="email"
          onChange={ this.handleChange }
          data-testid="email-input"
          type="email"
          placeholder="E-mail"
        />
        <input
          name="senha"
          id="senha"
          value={ senha }
          onChange={ this.handleChange }
          data-testid="password-input"
          type="password"
          placeholder="Senha"
        />
        <button
          onClick={ this.handleClick }
          disabled={ !validation }
          type="submit"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  loginOK: PropTypes.string.isRequired,
  addLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loginOK: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  addLogin: (email) => dispatch(user.login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
