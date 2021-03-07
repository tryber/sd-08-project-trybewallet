import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      disabled: true,
    };
  }

  handleClick() {
    const { userEml } = this.props;
    const { email } = this.state;
    this.setState({
      redirect: true,
    });
    userEml(email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    },
    () => this.validEmail());
  }

  validEmail() {
    const { email, password } = this.state;
    let disabled = true;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 6;
    disabled = !(emailValid.test(email) && password.length >= minLength);
    this.setState({ disabled });
  }

  render() {
    // const { userEml } = this.props;
    const { email, password, redirect, disabled } = this.state;
    console.log(this.state);
    return (
      <span>
        <h2>Login</h2>
        <input
          type="email"
          value={ email }
          name="email"
          onChange={ (event) => this.handleChange(event) }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ (event) => this.handleChange(event) }
          data-testid="password-input"
        />
        <button
          className="login-btn"
          type="button"
          disabled={ disabled }
          onClick={ () => this.handleClick() }
        >
          Entrar
        </button>
        {redirect ? <Redirect to="/carteira" /> : ''}
      </span>
    );
  }
}

Login.propTypes = {
  userEml: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEml: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
