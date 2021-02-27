import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">{email}</span>
          <span data-testid="total-field">Valor Total: 0</span>
          <span data-testid="header-currency-field">Câmbio: BRL</span>
        </header>
        <Form />
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
