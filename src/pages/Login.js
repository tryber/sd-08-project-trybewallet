import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actionUser from '../actions/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyEmailAndPassword(email, password) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minCaracteres = 6;
    const result = emailRegex.test(email) && password >= minCaracteres;
    return !result;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { handleChange, verifyEmailAndPassword, handleClick } = this;
    const { email, password } = this.state;
    const { user } = this.props;

    return (
      <form>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ handleChange }
        />
        <button
          type="button"
          disabled={ verifyEmailAndPassword(email, password.length) }
          onClick={ () => { user(email); handleClick(); } }
        >
          Entrar
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  user: (value) => dispatch(actionUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);
