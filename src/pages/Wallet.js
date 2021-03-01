import React, { Component } from 'react';
import Header from '../components/Header';
import ListaDeGastos from '../components/ListaDeGastos';
import Cambio from '../components/Cambio';
import AddGastos from '../components/AddGastos';
// import { connect } from 'react-redux';
// import store from '../store';

class Wallet extends Component {
  // vercurent() {
  //   const a = store.getState().wallet;
  //   return a;
  // }

  render() {
    // this.vercurent();
    return (
      <div className="flex-container">
        <div className="child1">
          <Header />
        </div>
        <div className="child2">
          <ListaDeGastos />
        </div>
        <div className="child3">
          <Cambio />
        </div>
        <div className="child4">
          <AddGastos />
        </div>

      </div>
    );
  }
}

export default Wallet;
