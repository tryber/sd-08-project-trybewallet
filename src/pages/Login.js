import React from 'react';

import LoginForm from '../components/LoginForm';

import styles from '../styles/pages/Login.module.css';

class Login extends React.Component {
  render() {
    return (
      <div className={ styles.loginContainer }>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
