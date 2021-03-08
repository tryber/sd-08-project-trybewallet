import React from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        Formulário de Despesas
        <InputForm />
      </div>
    );
  }
}

export default Wallet;
