import React from 'react';
import SpendTable from './Wallet/components/SpendTable';
import SpendForm from './Wallet/components/SpendForm';
import TopBar from './Wallet/components/TopBar';

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
