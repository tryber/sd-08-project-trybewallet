import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <ul>
          <li data-testid="email-field">{`Usuário Logado: ${email}`}</li>
          <li data-testid="total-field">Total: R$0 </li>
          <li data-testid="header-currency-field">Câmbio: BRL </li>
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps, null)(Header);
