import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { savedUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonAble: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  buttonAble() {
    const { email, password } = this.state;
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minOfCaracteres = 6;
    if (validEmail.test(email) && password.length >= minOfCaracteres) {
      this.setState({
        buttonAble: true,
      });
    } else {
      this.setState({
        buttonAble: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.buttonAble(); });
  }

  render() {
    const { email, password, buttonAble } = this.state;
    const { savedUserData } = this.props;
    return (
      <div className="Login">
        <h1>TRYBE WALLET</h1>
        <section className="login-inputs">
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="email"
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="senha"
            data-testid="password-input"
          />
        </section>
        <div>
          <Link
            to="/carteira"
            onClick={ () => savedUserData({ email, password }) }
          >
            <button type="button" disabled={ !buttonAble }>ENTRAR</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  savedUserData: (user) => dispatch(savedUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  savedUserData: PropTypes.func.isRequired,
};
