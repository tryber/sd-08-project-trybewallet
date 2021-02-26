import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Select } from '../components/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">
          { `Email: ${email}`}
        </h3>
        <h3 data-testid="total-field">
          0
        </h3>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
Header.propTypes = {
  email: PropTypes.string.isRequired,
};
