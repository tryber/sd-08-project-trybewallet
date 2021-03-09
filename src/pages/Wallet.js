import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ListaDeGastos from '../components/ListaDeGastos';
import Cambio from '../components/Cambio';
import AddGastos from '../components/AddGastos';
import EditGastos from '../components/EditGastos';

class Wallet extends Component {
  render() {
    const { isEditing } = this.props;
    return (
      <div className="flex-container">
        <div className="child1">
          <Header />
        </div>
        <div className="child2">
          <ListaDeGastos />
        </div>
        <br />
        <br />
        <br />
        <div className="child4">
          <AddGastos />
          <br />
          <br />
          <div className="child3">
            { isEditing ? <EditGastos /> : <Cambio /> }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(Wallet);
