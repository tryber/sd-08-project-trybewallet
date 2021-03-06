import React from 'react';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  render() {
    // const { isEditing } = this.props;
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletTable />
      </div>);
  }
}

export default Wallet;
