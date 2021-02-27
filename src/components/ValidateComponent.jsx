import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonComponent from './ButtonComponent';

class ValidateComponent extends React.Component {
  render() {
    const { email, password } = this.props;
    const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const minimumLengthOfPassword = 6;
    const validatePassword = password.length >= minimumLengthOfPassword;

    if (validateEmail && validatePassword) {
      return <ButtonComponent />;
    }
    return <button disabled="" type="button"> Entrar </button>;
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  password: user.password,
});

export default connect(mapStateToProps)(ValidateComponent);

ValidateComponent.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
