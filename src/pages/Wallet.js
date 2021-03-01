import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  render() {
    const { emailUser } = this.props;
    const { total } = this.state;
    console.log(emailUser);
    return (<Header email={ emailUser } total={ total } />);
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  emailUser: state.user.email,
});

Wallet.propTypes = {
  emailUser: PropTypes.string.isRequired,
  wallet: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Wallet);
