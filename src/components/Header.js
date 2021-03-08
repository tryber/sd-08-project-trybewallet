import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, saveTotal } = this.props;
    return (
      <div>
        <div>
          <p data-testid="email-field">{userEmail}</p>
        </div>
        <div>
          <p data-testid="total-field" value={ saveTotal }>{saveTotal}</p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  saveTotal: state.currency.sum,
});

// const mapDispatchToProps = {

// };

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  saveTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
