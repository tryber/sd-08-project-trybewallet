import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        email
        <input value={ email } data-testid="email-field" readOnly />
        depesa total
        <input value="0" data-testid="total-field" />
        <input value="BRL" data-testid="header-currency-field" readOnly />
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

export default connect(mapStateToProps, null)(Header);
