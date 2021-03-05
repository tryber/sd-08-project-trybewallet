import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class ValidateLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    this.setState({ shouldRedirect: true });
  }

  // buscando como dividir uma expressão regex muito grande, acabei achando uma expressão bem menor para validação de email nessa fonte https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript

  render() {
    const { shouldRedirect } = this.state;
    const { email, password } = this.props;
    const validateEmail = /\S+@\S+\.\S+/.test(email);
    const passwordLength = 6;
    const validatePassword = password.length >= passwordLength;
    const isValid = validateEmail && validatePassword;

    if (shouldRedirect) return <Redirect to="/carteira" />;
    // como criar um botão receber disabled foi retirado da seguinte fonte https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js
    return (
      <button
        type="button"
        disabled={ !isValid }
        onClick={ this.handleRedirect }
      >
        Entrar
      </button>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  password: user.password,
});

ValidateLogin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ValidateLogin);
