import React from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <br />
        Formulário de Despesas
        <InputForm />
      </>
    );
  }
}

export default Wallet;
