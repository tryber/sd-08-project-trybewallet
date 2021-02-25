import React from 'react';
import { connect } from 'react-redux';
import { userEmail, userPassword } from '../actions';
import Button from '../components/button';
import Inputs from '../components/Inputs';

class Login extends React.Component {
  render() {
    return (
      <div>
        <Inputs type="text" name="email" datatest="email-input">Email: </Inputs>
        <Inputs
          type="password"
          name="password"
          dataTest="password-input"
        >
          Password:
          {' '}
        </Inputs>
        <Button>Entrar</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email, validUser) => dispatch(userEmail(email, validUser)),
  addPassword: (password, validUser) => dispatch(userPassword(password, validUser)),
});

export default connect(null, mapDispatchToProps)(Login);
