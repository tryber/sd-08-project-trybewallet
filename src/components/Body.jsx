import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCoins as fetchCoinsThunk } from '../actions/requestAPI';
import Addexpense from './Addexpense';
import Table from './Table';

class Body extends Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    return (
      <>
        <form autoComplete="off">
          <Addexpense />
        </form>
        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
});

export default connect(null, mapDispatchToProps)(Body);

Body.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
};
