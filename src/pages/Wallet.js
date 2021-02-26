import React from 'react';
import { Link } from 'react-router-dom';
// import { Button, Select } from '../components/index';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, my friend</h1>
        <br />
        {/* <Select /> */}
        <br />
        <Link to="/carteira">
          {/* <Button /> */}
        </Link>
      </div>
    );
  }
}

export default Wallet;
