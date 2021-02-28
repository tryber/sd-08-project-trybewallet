import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class ValidateComponent extends React.Component {
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

  render() {
    const { shouldRedirect } = this.state;
    const { email, password } = this.props;
    const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const minimumLengthOfPassword = 6;
    const validatePassword = password.length >= minimumLengthOfPassword;
    const isValid = validateEmail && validatePassword;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <button
        disabled={ !isValid }
        type="button"
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

export default connect(mapStateToProps)(ValidateComponent);

ValidateComponent.propTypes = {
  email: PropTypes.func.isRequired,
  password: PropTypes.func.isRequired,
};
