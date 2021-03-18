import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { actionCreator } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonValidation: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    const passwordMinLength = 6;

    if (/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    && password.length >= passwordMinLength) return false;
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      buttonValidation: true,
    });
  }

  render() {
    const { buttonValidation, email, password } = this.state;
    if (buttonValidation) return <Redirect to="/carteira" />;
    return (
      <>
        <input
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
          type="email"
          onChange={ this.handleChange }
        />
        <input
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ password }
          type="text"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ this.loginValidation() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreator, dispatch);

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
