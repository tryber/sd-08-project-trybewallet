import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <dl>
          <dt>Email</dt>
          <dd data-testid="email-field">{ email }</dd>
          <dt>Total</dt>
          <dd data-testid="total-field">R$0</dd>
          <dt>Câmbio</dt>
          <dd data-testid="header-currency-field">BRL</dd>
        </dl>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({ email: user.email });

export default connect(mapStateToProps)(Header);
