import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        TrybeWallet
        email
        <input value={ email } data-testid="email-field" readOnly />
        depesa total
        <input value={ total } data-testid="total-field" readOnly />
        <input value="BRL" data-testid="header-currency-field" readOnly />
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
