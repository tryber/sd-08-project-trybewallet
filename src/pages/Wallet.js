import React from 'react';
import Header from '../components/Header';
import TabelaDeGastos from '../components/TabelaDeGastos';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <TabelaDeGastos />
      </div>
    );
  }
}

export default Wallet;
