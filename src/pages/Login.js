import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

const number = 5;

function validEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateBoth = this.validateBoth.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.validateBoth();
    this.setState({
      [name]: value,
    });
  }

  validateBoth() {
    this.setState({
      buttonDisabled: true,
    });
    const { email, password } = this.state;
    if (password.length >= number && validEmail(email)) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  render() {
    const { buttonDisabled, email, password } = this.state;
    const { setEmail, history } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="text"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ buttonDisabled }
            type="button"
            onClick={ () => {
              setEmail(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (value) => dispatch(setEmail(value)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
