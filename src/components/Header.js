import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, amount } = this.props;

    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{amount}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.total.amount,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
