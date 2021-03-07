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
      pass: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { gettingUserEmail, history } = this.props;
    const { email } = this.state;
    gettingUserEmail(email);
    history.push('/carteira');
  }

  checkValidity() {
    const six = 6;
    const { email, pass } = this.state;
    if (
      pass.length >= six
      && /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
        email,
      )
    ) return false;
    return true;
  }

  renderForms() {
    const { email, pass } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit.bind(this) }
        name="f1"
        className="login-form validate-form"
      >
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
            onChange={ this.handleChange.bind(this) }
            className="input"
            type="text"
            name="email"
            value={ email }
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
            onChange={ this.handleChange.bind(this) }
            className="input"
            type="text"
            name="pass"
            value={ pass }
            placeholder="Password"
          />
          <span className="focus-input" data-placeholder="&#xf191;" />
        </div>

        {this.renderButtonForm()}
      </form>
    );
  }

  renderButtonForm() {
    return (
      <div className="container-login-form-btn">
        <button
          disabled={ this.checkValidity() }
          name="input-email"
          type="submit"
          id="button"
          className="login-form-btn"
          value="Entrar"
          onClick=""
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
  gettingUserEmail: (UserEmail) => dispatch(getUserEmail(UserEmail)),
});

export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  gettingUserEmail: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
