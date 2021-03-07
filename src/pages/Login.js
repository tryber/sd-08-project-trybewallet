import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveEmail as saveEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateLogin() {
    const { email, password } = this.state;
    const isEmail = /\S+@\S+\.\S+/;
    const MINIMUM_PASSWORD_SIZE = 6;
    return !isEmail.test(email) || (password.length < MINIMUM_PASSWORD_SIZE);
  }

  render() {
    const { email, password } = this.state;
    const { saveEmail } = this.props;
    return (
      <section>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            id="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <Link
          to="/carteira"
        >
          <button
            type="button"
            disabled={ this.validateLogin() }
            onClick={ () => saveEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </section>);
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
