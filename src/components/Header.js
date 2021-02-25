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
    const { stateEmail } = this.props;
    const { total, currency } = this.state;

    return (
      <div className="header-component">
        <div data-testid="email-field">
          Email:
          { stateEmail }
        </div>
        <div data-testid="total-field">
          Despesa total:
          { total }
        </div>
        <div data-testid="header-currency-field">
          Moeda:
          { currency }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateEmail: state.user.email,
});

Header.propTypes = {
  stateEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
