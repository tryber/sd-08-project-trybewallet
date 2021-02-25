import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import login from '../actions';

const PASSWORD_REQUIREMENT = 5;
const pattern = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  redirect() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, password, redirect } = this.state;
    const { addUser } = this.props;

    if (redirect) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <input type="email" data-testid="email-input" onChange={ this.handleEmail } />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handlePassword }
        />
        <button
          type="button"
          disabled={ (password.length <= PASSWORD_REQUIREMENT) || !pattern.test(email) }
          onClick={ () => { addUser(email); this.redirect(); } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (value) => dispatch(login(value)),
});

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
