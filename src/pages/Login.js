import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      inputEmail: '',
      inputPassword: '',
    };
  }

  handleClick() {
    const { history, add } = this.props;
    const { inputEmail } = this.state;
    add(inputEmail);
    history.push('/carteira');
  }

  validate() {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { inputEmail, inputPassword } = this.state;
    const passLength = 6;
    let email = false;
    let pass = false;
    email = RegExp(pattern).test(inputEmail);
    pass = inputPassword.length > passLength;
    if (!email || !pass) return true;
    return false;
  }

  render() {
    const { inputEmail, inputPassword } = this.state;
    const bool = this.validate();
    return (
      <div className="div-login">
        <input
          type="email"
          name="email"
          placeholder="email"
          className="input-login"
          data-testid="email-input"
          value={ inputEmail }
          onChange={ (event) => this.setState({ inputEmail: event.target.value }) }
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="input-login"
          data-testid="password-input"
          maxLength="8"
          value={ inputPassword }
          onChange={ (event) => this.setState({ inputPassword: event.target.value }) }
        />
        <button
          type="submit"
          className="input-button"
          disabled={ bool }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(addUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
