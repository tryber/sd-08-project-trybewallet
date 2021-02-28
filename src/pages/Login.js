import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addEmailStore } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      disableValue: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { email } = this.state;
    const ruleNumber = 6;
    this.setState({
      [target.name]: target.value,
    });

    const validateEmail = /\S+@\S+\.\S+/;
    if (validateEmail.test(email) && target.value.length >= ruleNumber) {
      this.setState({
        disableValue: false,
      });
    } else {
      this.setState({
        disableValue: true,
      });
    }
  }

  handleClick() {
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, senha, disableValue, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="senha">
          <input
            id="senha"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            name="senha"
            value={ senha }
          />
        </label>
        <button
          type="button"
          disabled={ disableValue }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(addEmailStore(email)),
});

export default connect(null, mapDispatchToProps)(Login);
