import React from 'react';
import DataTable from '../components/DataTable';
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
        <br />
        <DataTable />
      </div>
    );
  }
}

export default Wallet;
