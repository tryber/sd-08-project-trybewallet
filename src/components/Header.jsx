import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h4>
          Email:
          <span data-testid="email-field">{ email }</span>
        </h4>
        <h4>
          Despesas gerais:
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </h4>
      </header>
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
