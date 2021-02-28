import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginValidation = this.handleLoginValidation.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const { email } = this.state;
    const { saveEmail: saveEmailAction } = this.props;
    saveEmailAction(email);
    this.state({
      isloggedIn: true,
    });
  }

  handleLoginValidation(email, password) {
    const MIN_PASSWD_LENGTH = 6;
    // Regex found at https://regexr.com/3e48o
    return (/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)
    && password.length >= MIN_PASSWD_LENGTH;
  }

  render() {
    const { email, password, isLoggedIn } = this.state;
    if (isLoggedIn) return <Redirect to="/carteira" />;
    return (
      <form>
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ !this.handleLoginValidation(email, password) }
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </form>

    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  saveEmail,
};

export default connect(null, mapDispatchToProps)(Login);
