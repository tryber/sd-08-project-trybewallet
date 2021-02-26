import React, { Component } from 'react';
import Header from '../components/Header';
import ListaDeGastos from '../components/ListaDeGastos';
import Cambio from '../components/Cambio';
import AddGastos from '../components/AddGastos';

class Wallet extends Component {
  render() {
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
