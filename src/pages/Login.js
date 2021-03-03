import React from 'react';
import FormLogin from '../components/LoginForm';

import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledBtn: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validityInputs = this.validityInputs.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.validityInputs();
    });
  }

  validityInputs() {
    const { email, password } = this.state;
    if (email.match(/^\w{3,}@\w+\.\w{2,6}(\.\w{2})?[^\s+]$/gm)
      && password.match(/^\w{5,}[^\s+]$/gm)) {
      this.setState({ disabledBtn: false });
    } else {
      this.setState({ disabledBtn: true });
    }
  }

  render() {
    const { email, password, disabledBtn } = this.state;
    return (
      <main className="content-login">
        <div className="content-title-login">
          <h1 className="title-login">Login</h1>
        </div>
        <FormLogin
          { ...{ email, password, disabledBtn } }
          handleInputChange={ this.handleInputChange }
        />
      </main>
    );
  }
}

export default Login;
