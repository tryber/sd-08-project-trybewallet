import React from 'react';
import Input from '../components/Input';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      validationEmail: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    console.log(target.value);
    const { value } = target;
    this.setState = ({
      email: value,
      validationEmail: false,
    });
  }

  // validation() {
  //   const validEmail = 'alguem@alguem.com';
  // }

  render() {
    const { email, senha } = this.state;
    console.log(email);
    return (
      <fieldset>
        <Input
          value={ email }
          name="email"
          type="text"
          onChange={ (e) => this.setState({ email: e.target.value }) }
        >
          Email:
        </Input>
        <Input value={ senha } name="password" type="password" minLength="6">Senha: </Input>
        {' '}
        //rejects
        <button type="submit">Enviar</button>
      </fieldset>
    );
  }
}

export default Login;
