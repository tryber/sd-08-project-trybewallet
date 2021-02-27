import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import './Login.css';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      email: '',
      password: '',
      isInValid: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  checkValid() {
    const { email, password } = this.state;
    const SIX = 6;
    if (/[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/gm.test(email)
    && password.length >= SIX) {
      this.setState(() => ({
        isInValid: false,
      }));
    } else {
      this.setState(() => ({
        isInValid: true,
      }));
    }
  }

  routeChange() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, password, isInValid } = this.state;
    const { userAction } = this.props;
    return (
      <div className="loginDiv">
        <img src={ logo } alt="Login Logo" height="150px" />
        <input
          type="text"
          id="email"
          name="email"
          data-testid="email-input"
          placeholder="Type your Email"
          value={ email }
          onChange={ this.handleChange }
          onKeyUp={ this.checkValid }
        />
        <input
          type="text"
          id="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
          onKeyUp={ this.checkValid }
          placeholder="Password"
        />
        <button
          type="button"
          disabled={ isInValid }
          onClick={ () => {
            userAction({ email, password });
            this.routeChange();
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  userAction: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userAction: (obj) => dispatch(loginUser(obj)),
});

export default connect(null, mapDispatchToProps)(Login);
