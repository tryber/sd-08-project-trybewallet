import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogin } from '../actions';

function validateEmail(email) { const re = /\S+@\S+\.\S+/; return re.test(email); }
// solution by Luiza Dilly
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.emailIsValid();
    });
  }

  emailIsValid() {
    this.setState({
      disabledBtn: true,
    });

    const { email, password } = this.state;
    const MINLENGTH = 6;

    if (password.length >= MINLENGTH && validateEmail(email)) {
      this.setState({
        disabledBtn: false,
      });
    }
  }

  render() {
    const { email, password, disabledBtn } = this.state;
    const { userLogin } = this.props;

    return (
      <fieldset>
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            value={ email }
            name="email"
            type="text"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            value={ password }
            name="password"
            type="password"
            minLength="6"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          onClick={ () => {
            userLogin(email);
            // history.push('/carteira');
          } }
          disabled={ disabledBtn }
        >
          <Link to="/carteira">
            Entrar
          </Link>
        </button>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (value) => dispatch(actionLogin(value)),
});

Login.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
