import React from 'react';
import SpendTable from './components/SpendTable';
import SpendForm from './components/SpendForm';
import TopBar from './components/TopBar';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <SpendForm />
        <SpendTable />
      </div>
    );
  }
}

export default Wallet;
