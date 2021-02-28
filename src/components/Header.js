import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  render() {
    const { readEmail } = this.props;

    return (
      <div className="div-header">
        <p data-testid="email-field">{ readEmail }</p>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  readEmail: PropTypes.string.isRequired,
};
