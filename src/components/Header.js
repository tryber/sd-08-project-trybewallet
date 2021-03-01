import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  render() {
    const { readEmail, total } = this.props;

    return (
      <div className="div-header">
        <p data-testid="email-field">{ readEmail }</p>
        <span data-testid="total-field">{ `Despesa Total: R$` + total + ` ` }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readEmail: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  readEmail: PropTypes.string,
  total: PropTypes.number,
};

Header.defaultProps = {
  readEmail: '',
  total: 0,
};
