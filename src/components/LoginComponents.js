import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Redirect from 'react-dom';
import { Link } from 'react-router-dom';
import { login } from '../actions/index';

class LoginComponents extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      isEmailValid: false,
      isPasswordValid: false,
      redirect: false,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
      isEmailValid: (!!(event.target.value.includes('@')
        && event.target.value.includes('.com'))),
    });
  }

  handleLogin() {
    const { email } = this.state;
    const { addEmail } = this.props;
    addEmail(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, isPasswordValid, isEmailValid, redirect } = this.state;
    const SIX = 6;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <input
          data-testid="email-input"
          name="email"
          type="email"
          value={ email }
          onChange={ this.handleEmail }
        />
        <input
          data-testid="password-input"
          type="password"
          onChange={ (e) => this.setState(
            { isPasswordValid: e.target.value.length >= SIX },
          ) }
        />
        <Link to="/carteira">
          <button
            disabled={ !(isPasswordValid && isEmailValid) }
            type="button"
            onClick={ () => {
              this.handleLogin();
            } }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

LoginComponents.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginComponents);
