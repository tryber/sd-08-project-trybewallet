import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          Email:
          {' '}
          {email}
        </div>
        <div data-testid="total-field">
          Total De Gastos
          :
          {' '}
          0
        </div>
        <div data-testid="header-currency-field">
          Cambio Exibido
          {' '}
          BRL
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,

};
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
