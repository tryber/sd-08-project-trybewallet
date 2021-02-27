import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import userLoginAction from '../actions/userActions';
// import user from '../reducers/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verify = this.verify.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.verify());
  }

  handleClick() {
    const { userLogin } = this.props;
    const { email } = this.state;
    this.setState({
      redirect: true,
    });
    userLogin(email);
  }

  verify() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const RE = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    if (password.length >= PASSWORD_LENGTH && RE.test(email)) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, password, disabled, redirect } = this.state;
    return (
      <div>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button disabled={ disabled } type="button" onClick={ this.handleClick }>
          Entrar
        </button>
        { redirect === true ? <Redirect to="/carteira" /> : '' }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(
    userLoginAction(email),
  ),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
