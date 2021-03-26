import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmailUserAction } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectWallet: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validatorEmail(email) {
    return !!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
  }

  validatorPassword(password) {
    const MIN_LENGTH_PASSWORD = 6;
    return password.length >= MIN_LENGTH_PASSWORD;
  }

  validatorDataLog() {
    const { email, password } = this.state;
    if (this.validatorEmail(email)
     && this.validatorPassword(password)) return false;
    return true;
  }

  handleSubmit() {
    const { saveEmailUser } = this.props;
    const { email } = this.state;
    saveEmailUser(email);
    this.setState({
      redirectWallet: true,
    });
  }

  render() {
    const { redirectWallet } = this.state;
    if (redirectWallet) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail do Usuário:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            value="Enviar"
            onClick={ this.handleSubmit }
            disabled={ this.validatorDataLog() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  saveEmailUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailUser: (email) => dispatch(saveEmailUserAction(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
