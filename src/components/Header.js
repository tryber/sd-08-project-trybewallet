import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logotrybe from './images/logotrybe.jpg';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="app-header">
        <img className="app-header__logo" src={ logotrybe } alt="logo da trybe" />
        <p className="app-header-email" data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,

};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
