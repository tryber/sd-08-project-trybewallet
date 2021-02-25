// Foi utilizado o arquivo igual ao feito em aula pelo ícaro. Contudo, totalmente compreendido e com algumas modificações
import React from 'react';
import { connect } from 'react-redux';
import PropsType from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: { userEmail: '', userPassword: '' },
      habilitaBotao: true,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.emailRender = this.emailRender.bind(this);
  }

  validateEmail(values) {
    const { errors: { userPassword } } = this.state;
    this.setState({ errors: { userPassword } });

    const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!reg.test(values)) {
      this.setState({ errors: { userEmail: 'Insira um e-mail válido', userPassword } });
    }
  }

  validatePassword(values) {
    const { errors: { userEmail } } = this.state;
    this.setState({ errors: { userEmail } });

    const NUMERO_DE_CARACTERES = 6;
    if (values.length < NUMERO_DE_CARACTERES) {
      this.setState({ errors:
        { userEmail, userPassword: 'Insira uma senha com pelo menos 6 caracteres' },
      });
    } else if (userEmail === undefined) {
      this.setState({ habilitaBotao: false });
    }
  }

  emailRender() {
    const { errors } = this.state;
    return (
      <div>
        <div className="formField">
          <input
            type="text"
            onChange={ (e) => {
              this.setState({ email: e.target.value });
              this.validateEmail(e.target.value);
            } }
            placeholder="email"
            data-testid="email-input"
          />
        </div>
        {errors.userEmail && <span className="formField__error">
          { errors.userEmail }
        </span>}
      </div>
    );
  }

  render() {
    const { email, password, errors, habilitaBotao } = this.state;
    const { login, history } = this.props;
    return (
      <div className="Login">
        <section className="login-inputs">
          { this.emailRender() }
          <div className="formField">
            <input
              type="password"
              value={ password }
              onChange={ (e) => {
                this.setState({ password: e.target.value });
                this.validatePassword(e.target.value);
              } }
              placeholder="senha"
              data-testid="password-input"
            />
          </div>
          {errors.userPassword && <span className="formField__error">
            { errors.userPassword }
          </span>}
        </section>
        <div className="button">
          <button
            type="button"
            disabled={ habilitaBotao }
            onClick={ () => {
              login({ email });
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropsType.func.isRequired,
  history: PropsType.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
