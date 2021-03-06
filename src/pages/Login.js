import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisable: true,
      redirect: false,
    };

    this.changeInput = this.changeInput.bind(this);
    this.validate = this.validate.bind(this);
    this.redirectLink = this.redirectLink.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const MIN_LENGTH = 5;
    const regex = /^\w+@\w+\.\w{2,}$/i;

    const teste = (password.length >= MIN_LENGTH && regex.test(email));
    this.setState({
      isDisable: !teste,
    });
  }

  changeInput(e) {
    const { type, value } = e;
    this.setState({
      [type]: value,
    });
    this.validate();
  }

  redirectLink() {
    const { setUserToRedux } = this.props;
    const { email, password } = this.state;
    setUserToRedux(email, password);
    this.setState({ redirect: true });
  }

  render() {
    const { isDisable, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div className="container">
        <section className="login-form">
          <h1>Trybe Wallet</h1>
          <form>
            <input
              type="email"
              data-testid="email-input"
              placeholder="Seu e-mail"
              onChange={ (e) => this.changeInput(e.target) }
            />
            <input
              type="password"
              data-testid="password-input"
              placeholder="Sua Senha"
              onChange={ (e) => this.changeInput(e.target) }
            />
            <button
              type="button"
              disabled={ isDisable }
              onClick={ () => this.redirectLink() }
            >
              Entrar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserToRedux: (email, password) => dispatch(setUser(email, password)),
});

Login.propTypes = {
  setUserToRedux: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
