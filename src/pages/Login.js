import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      validaEmail: false,
      validaSenha: false,
    };
  }

  handelEmail(e) {
    const { value } = e.target;
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z_]{2,3}$/;
    // https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635
    this.setState = ({
      email: value,
      validaEmail: RegExp(regex).test(value),
    });
  }

  handelSenha(e) {
    const { value } = e.target;
    const senha = value;
    const six = 6;
    this.setState = ({
      senha: value,
      validaSenha: senha.length > six,
    });
  }

  render() {
    const { senha, email, validaEmail, validaSenha } = this.state;

    return (
      <>
        <label htmlFor="email">
          Email
          <br />
          <input
            id="email"
            name="email"
            placeholder="email@email.com"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => console.log(e.target.value) }
            required
          />
        </label>
        <br />
        <label htmlFor="senha">
          <br />
          Senha
          <br />
          <input
            id="senha"
            name="senha"
            placeholder="**********"
            value={ senha }
            onChange={ (e) => this.handelSenha(e) }
            required
          />
        </label>
        <br />
        <br />
        <Link to="/wallet">
          <button type="button" disabled={ !(validaEmail && validaSenha) }>Entar</button>
        </Link>
      </>
    );
  }
}

export default Login;
