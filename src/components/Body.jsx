import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCoins as fetchCoinsThunk } from '../actions/requestAPI';
import Addexpense from './Addexpense';
import Table from './Table';
import Edit from './Edit';

class Body extends Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <>
        <form autoComplete="off">
          {!isEditing ? <Addexpense /> : <Edit />}
        </form>
        <Table />
      </>
    );
  }
}

const mapStateToProps = ({ edit: { isEditing } }) => ({
  isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCoinsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);

Body.propTypes = {
  fetchCoins: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

Body.defaultProps = {
  isEditing: false,
};
