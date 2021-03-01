import React from 'react';
import Header from './componentes/Header';
import SectionDespesas from './componentes/SectionDespesas';
import Tabela from './componentes/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <SectionDespesas />
        <br />
        <br />
        <Tabela />
      </>
    );
  }
}

export default Wallet;
