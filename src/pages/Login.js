import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import currentUser from '../actions';

// solution for validation : https://www.w3resource.com/javascript/form/email-validation.php

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: false,
      emailtxt: '',
      password: false,
    };
    this.ValidatePass = this.ValidatePass.bind(this);
    this.ValidateMail = this.ValidateMail.bind(this);
  }

  ValidateMail(mail) {
    const emailpattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailpattern.test(mail.value) && mail.type === 'email') {
      return this.setState({
        email: true,
        emailtxt: mail.value,
      });
    }
    return this.setState({
      email: false,
    });
  }

  ValidatePass(pass) {
    const minLenghtpassword = 6;
    const password = pass.value.length;
    const passwordtest = password === minLenghtpassword || password > minLenghtpassword;
    if (passwordtest && pass.type === 'password') {
      return this.setState({
        password: true,
      });
    }
    return this.setState({
      password: false,
    });
  }

  render() {
    const { email, password, emailtxt } = this.state;
    const { Setuser } = this.props;
    return (
      <section className="login-container">
        <form onSubmit={ () => console.log('submitado') }>
          <label htmlFor="Login">
            Login
            <input
              type="email"
              data-testid="email-input"
              onChange={ (e) => this.ValidateMail(e.target) }
              required
            />
          </label>
          <label htmlFor="Password">
            Password
            <input
              type="password"
              data-testid="password-input"
              minLength="6"
              onChange={ (e) => this.ValidatePass(e.target) }
              required
            />
          </label>
          <Link to="carteira">
            <button
              type="button"
              onClick={ () => Setuser(emailtxt) }
              disabled={ !email || !password }
            >
              Entrar
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Setuser: (email) => dispatch(currentUser(email)),
});

Login.propTypes = {
  Setuser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
