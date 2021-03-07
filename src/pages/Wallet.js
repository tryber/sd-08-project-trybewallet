import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';

class Wallet extends React.Component {
  render() {
    const { isFetching } = this.props;
    if (isFetching) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <AddExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

Wallet.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
