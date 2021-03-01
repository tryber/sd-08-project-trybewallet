import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container wallet-container">
        <Header email={ user } total="R$ 0,00" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});
// const mapDispatchToProps = () => ({});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
