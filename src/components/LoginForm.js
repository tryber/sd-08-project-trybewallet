import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as UserActions } from '../actions/index';

// import styles from '../styles/components/LoginForm.module.css';

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

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({ shouldRedirect: true });
  }

  checkValidity() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length < MIN_PASSWORD_LENGTH) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  }

  render() {
    const { email, password, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <div>
        <form
          // className={ styles.loginForm }
          onSubmit={ this.handleSubmit }
          autoComplete="off"
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
            disabled={ !this.checkValidity() }
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

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
