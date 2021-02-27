import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail as addEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  validateEmailAndPassword = (email, password) => {
    const SIX = 6;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailIsValid || password.length < SIX) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  // componentDidUpdate () {
  //   this.validateEmailAndPassword(this.state.email, this.state.password)
  // }

  handleChange = (callback, event) => {
    callback();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <div>Login</div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndPassword(event.target.value, password), event,
            ) }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndPassword(email, event.target.value), event,
            ) }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => addEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (value) => dispatch(addEmailAction(value)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
