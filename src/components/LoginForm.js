import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../actions/user';

import styles from '../styles/components/LoginForm.module.css';
import walletGif from '../assets/wallet.gif';

const validationRules = {
  email: (email) => new RegExp([
    '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?',
    '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
  ].join('')).test(email),
  password: (password) => {
    const MIN_PASSWORD_LENGTH = 6;
    return password.length >= MIN_PASSWORD_LENGTH;
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: '',
        password: '',
      },
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(
      ({ fields }) => ({
        fields: {
          ...fields,
          [name]: value,
        },
      }),
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { fields: { email } } = this.state;
    saveEmail(email);
    this.setState({ redirect: true });
  }

  checkValidity() {
    const { fields } = this.state;
    return Object.entries(fields)
      .map(([field, value]) => (
        validationRules[field] ? validationRules[field](value) : true))
      .every((validation) => validation === true);
  }

  render() {
    const { redirect, fields } = this.state;
    const { email, password } = fields;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <div className={ styles.loginFormContainer }>
        <img className={ styles.gif } src={ walletGif } alt="Wallet gif" />
        <form
          className={ styles.loginForm }
          onSubmit={ this.handleSubmit }
        >
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="Email"
            onChange={ this.handleChange }
          />

          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            disabled={ !this.checkValidity() }
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

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
