import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { userEmail } = this.props;
    const { total, currency } = this.state;
    return (
      <div>
        <div data-testid="email-field">
          Email:
          { userEmail }
        </div>
        <div data-testid="total-field">
          Despesa Total:
          { total }
          <span data-testid="header-currency-field">{ currency }</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
