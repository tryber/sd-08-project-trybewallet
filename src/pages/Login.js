import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.formsCheck = this.formsCheck.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formsCheck() {
    const { email, password } = this.state;
    const passwordMin = 6;
    if (password.length < passwordMin) return true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true;
    return false;
  }
  // https://formik.org/docs/guides/validation (Regex validação e-mail)

  formSubmit(event) {
    event.preventDefault();
    console.log('teste submit');
  }

  render() {
    const { email, password } = this.state;
    return (
      <form
        onSubmit={ this.formSubmit }
      >
        <h2>Login</h2>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="text"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ this.formsCheck() }
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
