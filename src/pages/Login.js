import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { login } = this.props;
    return (
      <div className="Login">
        <section className="login-inputs">
          <input
            type="text"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            placeholder="email"
            data-testid="email-input"
          />
          <input
            type="password"
            onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder="senha"
            data-testid="password-input"
          />
        </section>
        <div className="link">
          <Link to="/carteira">
            <button
              type="button"
              onClick={ () => login({ email, password }) }
              data-testid="btn-login"
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
