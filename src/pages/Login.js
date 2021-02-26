import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUserEmail } from '../actions/walletActions';

import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  onButton() {
    const { email, password } = this.state;

    if (email !== '' && password !== '') {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleChangeEmail(event) {
    if (/^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/i
      .test(event.target.value)) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      this.onButton();
    } else {
      this.setState({
        [event.target.name]: '',
      });
    }
  }

  handleChangePassword(event) {
    if (/\d{5,}/g.test(event.target.value)) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      this.onButton();
    } else {
      this.setState({
        [event.target.name]: '',
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { writeEmail } = this.props;
    const { email, btnDisabled } = this.state;

    return (
      <form className="form" onSubmit={ this.handleSubmit }>
        Login
        <div>
          <input
            type="text"
            name="email"
            onChange={ this.handleChangeEmail }
            placeholder="alguem@alguem.com"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            onChange={ this.handleChangePassword }
            placeholder="senha"
            data-testid="password-input"
          />
        </div>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ () => writeEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  readEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  writeEmail: (email) => dispatch(actionUserEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  writeEmail: PropTypes.func.isRequired,
};
