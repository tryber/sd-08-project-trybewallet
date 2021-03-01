import React from 'react';
import AddForm from '../components/AddForm';
import Headers from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Headers />
        <AddForm />
      </div>
    );
  }
}

export default Wallet;
