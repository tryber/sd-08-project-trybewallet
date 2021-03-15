import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
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

  envia() {
    const { email } = this.state;
    const { userEM } = this.props;
    this.setState({
      redirect: true,
    });
    userEM(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validEmail();
  }

  validEmail() {
    const { email, password } = this.state;
    let disabled = true;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 5;
    disabled = !(emailValid.test(email) && password.length >= minLength);
    this.setState({ disabled });
  }

  render() {
    const { email, password, redirect, disabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          <input
            value={ password }
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => this.envia() }
        >
          Entrar
        </button>
        {redirect && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEM: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  userEM: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
