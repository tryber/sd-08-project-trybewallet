import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { connect } from 'react-redux';
import getUserEmail from '../actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      inactive: true,
      count: '',
    };
  }

  emailValidation(event) {
    const email = event.target.value;
    // const at = email.indexOf('@');
    // const userName = email.substring(0, email.indexOf('@'));
    // const domainEmail = email.substring(email.indexOf('@') + 1, email.length);
    // const dotsIndomainEmail = Object.values(domainEmail).filter((item) => item.includes('.')).length;

    if (
      email.match(
        /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/,
      )
      // at !== ''
      // && at !== -1
      // && at !== ' '
      // && at !== null
      // && at !== undefined
      // && userName.length >= 2
      // && userName.includes('@') === false
      // && userName.includes(' ') === false
      // && userName.includes('.') >= 0
      // && domainEmail.length >= 3
      // && domainEmail.includes('@') === false
      // && domainEmail.includes(' ') === false
      // && dotsIndomainEmail <= 2
      // && (domainEmail.includes('.com') || domainEmail.includes('.com.br'))
      // && domainEmail.lastIndexOf('.') < domainEmail.length - 1
    ) {
      this.setState({
        count: 2,
        email,
      });
      const { getingUserEmail } = this.props;
      getingUserEmail(email);
    } else {
      this.setState({
        count: 1,
        email: '',
        inactive: true,
      });
    }
    const { count } = this.state;
    return count && this.cofirm;
  }

  passValidation(event) {
    const numberSix = 6;
    const { email } = this.state;
    const pass = event.target.value;
    if (pass.length >= numberSix && !!email.length) {
      this.setState({
        inactive: false,
        count: 2,
      });
    } else {
      this.setState({
        inactive: true,
        count: 1,
      });
    }
    return this.cofirm;
  }

  cofirm() {
    const { count, inactive } = this.state;

    const btn = document.getElementById('button');
    if (count === 2 && inactive === false && btn.disabled === false) {
      const { history } = this.props;
      history.push('/carteira');
    }
  }

  renderForms() {
    return (
      <form name="f1" className="login-form validate-form">
        <span className="login-form-logo">
          <i className="zmdi zmdi-landscape" />
        </span>

        <span className="login-form-title">Log in</span>

        <div
          className="wrap-input validate-input"
          data-validate="Enter username"
        >
          <input
            data-testid="email-input"
            onChange={ this.emailValidation.bind(this) }
            className="input"
            type="text"
            name="email"
            placeholder="Email"
          />
          <i className=" focus-input" placeholder="&#xf644;" />
        </div>

        <div
          className="wrap-input validate-input"
          data-validate="Enter password"
        >
          <input
            data-testid="password-input"
            onChange={ this.passValidation.bind(this) }
            className="input"
            type="text"
            name="pass"
            placeholder="Password"
          />
          <span className="focus-input" data-placeholder="&#xf191;" />
        </div>

        {this.renderButtonForm()}
      </form>
    );
  }

  renderButtonForm() {
    const { inactive } = this.state;
    return (
      <div className="container-login-form-btn">
        <button
          disabled={ inactive }
          name="input-email"
          type="button"
          id="button"
          className="login-form-btn"
          value="Entrar"
          onClick={ this.cofirm.bind(this) }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login container-login-bg">
          <div className="wrap-login">{this.renderForms()}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getingUserEmail: (UserEmail) => dispatch(getUserEmail(UserEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  getingUserEmail: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
