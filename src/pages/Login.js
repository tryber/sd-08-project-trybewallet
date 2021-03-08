import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

const FIVE = 5;
function validarEmail(email) { const re = /\S+@\S+\.\S+/; return re.test(email); }

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.validation();
    this.setState({
      [name]: value,
    });
  }

  validation() {
    this.setState({
      disabledButton: true,
    });
    const { email, password } = this.state;
    if (password.length >= FIVE && validarEmail(email)) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  render() {
    const { email, password, disabledButton } = this.state;
    const { sendEmail, history } = this.props;
    return (
      <fieldset>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            sendEmail(email);
            history.push('/carteira');
          } }
          disabled={ disabledButton }
        >
          Entrar
        </button>
      </fieldset>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return (
    {
      sendEmail: (value) => dispatch(addEmail(value)),
    }
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
