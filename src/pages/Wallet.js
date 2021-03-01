import React from 'react';
import Header from './componentes/Header';
import SectionDespesas from './componentes/SectionDespesas';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SectionDespesas />
      </>
    );
  }
}

export default Wallet;
