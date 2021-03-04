import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
      loading: false,
    };
  }

  changeHandler() {
    const { Change } = this.props;
    const { email } = this.state;

    Change(email);
    this.setState({ shouldRedirect: true, loading: true });
  }

  render() {
    const { shouldRedirect, loading } = this.state;
    if (shouldRedirect === true) {
      return <Redirect to="/carteira" />;
    }
    if (loading === true) {
      return <div>Carregando ....</div>;
    }

    const { email, password } = this.state;
    const limite = 5;
    return (
      <div className="Login">
        <form>
          <label htmlFor="input-mail">
            Login
            <input
              data-testid="email-input"
              type="text"
              id="input-mail"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="email"
            />
          </label>
          <label htmlFor="input-pass">
            Senha
            <input
              data-testid="password-input"
              value={ password }
              type="password"
              onChange={ (e) => this.setState({ password: e.target.value }) }
              placeholder="senha"
            />
          </label>
        </form>
        <div className="link">
          <button
            type="button"
            disabled={ password.length <= limite
            || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) }
            onClick={ () => this.changeHandler(email) }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Change: (value) => dispatch(userEmail(value)),
});

Login.propTypes = {
  Change: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
