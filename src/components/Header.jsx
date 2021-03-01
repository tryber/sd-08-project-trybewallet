import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <img src="https://flomio.com/wp-content/uploads/2016/10/Wallet.png" alt="logo" />
        <div className="header-content-container">
          <span>Email: </span>
          <p data-testid="email-field">{ email }</p>
          <span>Despesa Total:</span>
          <span className="header-total-value">R$</span>
          <span
            data-testid="total-field"
            className="header-total-value"
          >
            { totalValue }
          </span>
          <span
            data-testid="header-currency-field"
            className="header-total-value"
          >
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number,
};

Header.defaultProps = {
  totalValue: 0,
};

export default connect(mapStateToProps, null)(Header);
