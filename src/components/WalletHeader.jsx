import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class WalletHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentCurrency: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { total, currentCurrency } = this.state;
    return (
      <div>
        <h2 data-testid="email-field">{`Seu e-mail é ${email}`}</h2>
        <p data-testid="total-field">{`Total gasto : ${total}`}</p>
        <p data-testid="header-currency-field">{`Moeda escolhida: ${currentCurrency}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(WalletHeader);
