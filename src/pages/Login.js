import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import userInfo from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.disableButton = this.disableButton.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  onChangeHandler(field, newValue) {
    this.setState({ [field]: newValue });
  }

  disableButton(func) {
    const re = /\S+@\S+\.\S+/;
    const minLength = 6;
    const { email, password } = this.state;
    const funcs = (data) => {
      func(data);
      this.setState({
        redirect: true,
      });
    };
    return (
      password.length >= minLength && re.test(email)
        ? <button type="submit" onClick={ () => funcs(email) }>Entrar</button>
        : <button type="submit" disabled>Entrar</button>
    );
  }

  render() {
    const { getEmail } = this.props;
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <input
          placeholder="Email"
          type="text"
          data-testid="email-input"
          onChange={ (e) => this.onChangeHandler('email', e.target.value) }
        />
        <input
          placeholder="Password"
          type="text"
          data-testid="password-input"
          onChange={ (e) => this.onChangeHandler('password', e.target.value) }
        />
        { this.disableButton(getEmail) }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userInfo(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
