import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    const { emailSave } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            placeholder="example@hotmail.com"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Digite a sua senha"
            onChange={ this.handleChangePassword }
          />
          <Link to="/carteira">
            <button
              type="button"
              onClick={ () => emailSave(email) }
              disabled={
                !(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/.test(email)
                && password === '123456')
              }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  emailSave: (e) => dispatch(userLogin(e)),
});
Login.propTypes = {
  emailSave: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
