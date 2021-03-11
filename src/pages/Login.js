import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.go = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  go() {
    // feito com ajuda do site :https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e
    const { email } = this.state;
    const reg = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !reg;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>Trybe Wallet</h2>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            placeholder="email"
            type="text"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
            type="text"
            value={ password }
          />
        </label>
        <button type="button">Entrar</button>
      </div>

    );
  }
}

export default Login;
