import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Button extends React.Component {
  render() {
    const { email, password } = this.props;
    const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const minimumLengthOfPassword = 6;
    const validatePassword = password.length >= minimumLengthOfPassword;

    return validateEmail && validatePassword
      ? <Link to="/carteira">Entrar</Link>
      : <button type="button" disabled> Entrar </button>;
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  password: user.password,
});

export default connect(mapStateToProps)(Button);

Button.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
