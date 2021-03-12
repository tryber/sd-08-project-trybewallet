import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormLogin from '../Components/LoginComponent';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateImputs = this.validateImputs.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
  }

  validateImputs() {
    const minimumPasswordLength = 6;
    const { email, password } = this.state;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidator.test(email) && password.length >= minimumPasswordLength) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleWallet() {
    const { email } = this.state;
    const { add } = this.props;
    add(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    return (
      <FormLogin
        validateImputs={ this.validateImputs }
        handleChange={ this.handleChange }
        handleWallet={ this.handleWallet }
      />
    );
  }
}

const mapStatetoProps = (store) => ({
  store,
});

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addEmail(e)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);

Login.propTypes = {
  add: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};
