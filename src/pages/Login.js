import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { savesUserEmail as savesUserEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
    };
  }

  handleClick() {
    const { email } = this.state;
    const { savesUserEmail } = this.props;
    this.setState({
      redirect: true,
    });
    savesUserEmail(email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
    // this.emailValidation();
  }

  emailValidation() {
    const { email, password } = this.state;
    let disabled = true;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const minLength = 6;
    disabled = !(emailValid.test(email) && password.length >= minLength);
    this.setState({ disabled });
  }

  render() {
    const { disabled, email, password, redirect } = this.state;
    const { handleChange, handleClick, emailValidation } = this;
    return (
      <section>
        <form>
          <label
            htmlFor="email"
          >
            Email
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ (event) => handleChange(event) }
            />
          </label>
          <label
            htmlFor="email"
          >
            Senha
            <input
              data-testid="password-input"
              name="password"
              value={ password }
              type="password"
              onChange={ (event) => handleChange(event) }
              onKeyUp={ () => emailValidation() }
            />
          </label>
          <button
            className="login-btn"
            type="button"
            disabled={ disabled }
            onClick={ () => handleClick() }
          >
            Entrar
          </button>
          { redirect ? <Redirect to="/carteira" /> : '' }
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  savesUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savesUserEmail: (email) => dispatch(savesUserEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
