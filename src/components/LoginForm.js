import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../actions/user';

import styles from '../styles/components/LoginForm.module.css';
import walletGif from '../assets/wallet.gif';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckValidity = this.handleCheckValidity.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    saveEmail(this.emailInput.value);
    this.setState({ redirect: true });
  }

  handleCheckValidity() {
    this.setState({ disabled: !this.form.checkValidity() });
  }

  render() {
    const { disabled, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div className={ styles.loginFormContainer }>
        <img className={ styles.gif } src={ walletGif } alt="Wallet gif" />
        <form
          className={ styles.loginForm }
          onSubmit={ this.handleSubmit }
          onChange={ this.handleCheckValidity }
          ref={ (form) => { this.form = form; } }
        >
          <input
            ref={ (emailInput) => { this.emailInput = emailInput; } }
            type="email"
            data-testid="email-input"
            placeholder="Email"
            required
          />

          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            minLength={ 6 }
            required
          />

          <button
            type="submit"
            disabled={ disabled }
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

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
