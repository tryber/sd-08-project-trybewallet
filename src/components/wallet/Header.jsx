import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header(props) {
  const { userLogin } = props;
  return (
    <header>
      <div data-testid="email-field">
        Usuário:
        {' '}
        {userLogin}
      </div>
      <div data-testid="total-field">
        Despesa total: 0
      </div>
      <div data-testid="header-currency-field">
        BRL
      </div>
    </header>
  );
}

Header.propTypes = {
  userLogin: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
