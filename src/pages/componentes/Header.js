import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{email}</p>
        </header>
        <section>
          <h2>Lista de Gastos</h2>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
