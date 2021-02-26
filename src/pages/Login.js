import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleLogin } from '../actions/index';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInput(position, input) {
    this.setState({
      [position]: input,
    });
  }

  validateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      .test(mail)) {
      return (true);
    }
    // window.alert('You have entered an invalid email address!');
    return (false);
  }

  render() {
    const { email, password } = this.state;
    const { login, user } = this.props;
    if (user.email !== '') {
      return <Redirect to="/carteira" />;
    }
    return (
      <form action="post">
        <fieldset>
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => this.handleInput('email', e.target.value) }
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            min="6"
            onChange={ (e) => this.handleInput('password', e.target.value) }
            required
          />
          <button
            type="button"
            disabled={ (password.length < MIN_PASSWORD_LENGTH
              || this.validateEmail(email) === false) }
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  a: console.log(state),
  user: { email: state.user.email },
});

const mapDispatchToProps = (dispatch) => ({
  login: (userEmail) => dispatch(handleLogin(userEmail)),
});

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
