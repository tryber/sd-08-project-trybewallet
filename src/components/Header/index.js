import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWallet: 0,
    };
  }

  render() {
    const { currentWallet } = this.state;
    const { email } = this.props;
    console.log(email);
    return (
      <header>
        <div>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span data-testid="total-field">{currentWallet}</span>
        </div>
        <div>
          <span data-testid="header-currency-field">BRL</span>
        </div>
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

export default connect(mapStateToProps, null)(Header);
