import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import setEmail from '../actions/userActions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  isValidEmail(email) {
    const emailValidation = email.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    return emailValidation != null;
  }

  isValidPassword(password) {
    const MINIMUM_NUMBER_OF_CHARACTERS = 6;
    return password.length >= MINIMUM_NUMBER_OF_CHARACTERS;
  }

  validateSubmit() {
    const { email, password } = this.state;
    return this.isValidEmail(email) && this.isValidPassword(password);
  }

  handleClick(event) {
    event.preventDefault();
    const { history, addEmailToRedux } = this.props;
    const { email } = this.state;
    if (this.validateSubmit()) {
      addEmailToRedux(email);
      history.push('/carteira');
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <main>
        <h1>Login</h1>
        <form>
          <Input
            name="email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <Input
            name="password"
            type="password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="submit"
            onClick={ this.handleClick }
            disabled={ !this.validateSubmit() }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addEmailToRedux: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmailToRedux: (email) => dispatch(setEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
