import React from 'react';
import PropTypes from 'prop-types';
import LoginInput from './components/LoginInput';

const Login = ({ history }) => (
  <LoginInput history={ history } />
);

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
