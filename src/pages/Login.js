import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveEmail as EmailSave } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: true,
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validationOfInputs = this.validationOfInputs.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.validationOfInputs(); });
  }

  validationOfInputs() {
    const { email, password } = this.state;
    // Regex retirado do canal da turma 7, postado por Rafael Guimarães
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    && /^.{6,}$/.test(password)) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  redirectToWallet(button) {
    const { email } = this.state;
    const { saveEmail } = this.props;
    button.preventDefault();
    saveEmail(email);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { email, password, disabled, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="./carteira" />;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button type="submit" disabled={ disabled } onClick={ this.redirectToWallet }>
          Entrar
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(EmailSave(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
