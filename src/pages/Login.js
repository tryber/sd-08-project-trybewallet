import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getEmail from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);

    this.state = {
      email:'',
      password:'',
      button: true,
    }
  }

  handleChange({ target }) {
    const { name, value } = target

    this.setState({
      [name]: value,
    })
    this.verifyInputs()
  }

  verifyInputs() {
    const { email, password } = this.state

    if(email.match(/^\w{3,}@\w+\.\w{2,6}(\.\w{2})?[^\s+]$/gm)
    && password.length >= 5 ) {
      console.log('foi')
      this.setState({
        button: false
      });
    } else {
      console.log('nao foi')
      this.setState({
        button: true
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Home
        </h1>
        <label>
          Email:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            placeholder="email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="senha"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <Link to="/carteira">
          <button
          disabled={this.state.button}
          onClick={this.props.saveEmail}
          type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveEmail: (email) => dispatch(
    getEmail(email)
  )
});

export default connect(null, mapDispatchToProps)(Login);
