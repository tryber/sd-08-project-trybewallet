import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../styles/components/Header.module.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className={ styles.header }>
        <dl className={ styles.headerInfos }>
          <div className={ styles.headerInfosItem }>
            <dt>Email:</dt>
            <dd data-testid="email-field">{ email }</dd>
          </div>
          <div className={ styles.headerInfosItem }>
            <dt>Despesa total:</dt>
            <dd data-testid="total-field">0</dd>
          </div>
          <div className={ styles.headerInfosItem }>
            <dt>Câmbio:</dt>
            <dd data-testid="header-currency-field">BRL</dd>
          </div>
        </dl>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
