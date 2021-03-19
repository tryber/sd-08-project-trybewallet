import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.eventHandler = this.eventHandler.bind(this);
    this.validation = this.validation.bind(this);
    this.clickFunc = this.clickFunc.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  eventHandler({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validation() {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const passwordLength = 6;
    return re.test(email) && password.length >= passwordLength;
  }

  clickFunc() {
    const { changeEmail, history } = this.props;
    const { email } = this.state;

    history.push('/carteira');
    changeEmail(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form className="login">
          <label htmlFor="email">
            Login
            <input
              id="email"
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.eventHandler }
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.eventHandler }
            />
          </label>
          <button
            className="button-entrar"
            type="button"
            disabled={ !this.validation() }
            onClick={ this.clickFunc }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, actions)(Login);

Login.propTypes = {
  changeEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
