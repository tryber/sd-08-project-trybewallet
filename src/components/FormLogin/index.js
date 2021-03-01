import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import validateEmail from '../../services/validateEmail';
import validatePassword from '../../services/validatePassword';
import addUser from '../../actions/index';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValidPass: false,
      shouldRedirect: false,
    };

    this.renderInputEmail = this.renderInputEmail.bind(this);
    this.renderInputPassword = this.renderInputPassword.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    const { value, name } = event.target;
    if (name === 'email') {
      const isValidEmail = validateEmail(value);
      this.setState({ [name]: value, isValidEmail });
    }
    if (name === 'password') {
      const isValidPass = validatePassword(value);
      this.setState({ [name]: value, isValidPass });
    }
  }

  renderInputEmail() {
    const { email } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            placeholder="Digite seu email"
            name="email"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ (event) => this.handleEvent(event) }
          />
        </label>
      </div>
    );
  }

  renderInputPassword() {
    const { password } = this.state;
    return (
      <div>
        <label htmlFor="password">
          Senha
          <input
            placeholder="Digite sua senha"
            name="password"
            data-testid="password-input"
            type="password"
            value={ password }
            minLength="6"
            onChange={ (event) => this.handleEvent(event) }
          />
        </label>
      </div>
    );
  }

  renderButton() {
    const { isValidEmail, isValidPass, email, password } = this.state;
    const userDataStore = { email, password };
    const { submit } = this.props;
    return (
      <div>
        <input
          type="button"
          onClick={ () => this.setState({ shouldRedirect: true },
            () => submit(userDataStore)) }
          disabled={ !(isValidEmail && isValidPass) }
          value="Entrar"
        />
      </div>
    );
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <form>
          {this.renderInputEmail()}
          {this.renderInputPassword()}
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  submit: (userData) => dispach(addUser(userData)) });

export default connect(null, mapDispatchToProps)(FormLogin);

FormLogin.propTypes = {
  submit: propTypes.func.isRequired,
};
