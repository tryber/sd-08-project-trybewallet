import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveEmail as saveEmailAction } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabledEmail: true,
      disabledPassword: true,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { email } = this.state;
    const { history, saveEmail } = this.props;
    saveEmail(email);
    history.push('/carteira');
  }

  handleChangeEmail(event) {
    const email = event.target.value;

    this.setState({
      email: event.target.value,
      disabledEmail: !this.emailValidate(email),
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;

    this.setState({
      password: event.target.value,
      disabledPassword: !this.passwordValidate(password),
    });
  }

  emailValidate(email) {
    const re = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; // plantão
    return re.test(String(email).toLowerCase());
  }

  passwordValidate(password) {
    const minCaracters = 5;
    return password.length > minCaracters;
  }

  render() {
    const { email, password, disabledEmail, disabledPassword } = this.state;

    return (
      <form action="">
        <input
          type="text"
          name
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChangeEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChangePassword }
        />
        <button
          type="button"
          disabled={ disabledEmail || disabledPassword }
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

LoginForm.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
