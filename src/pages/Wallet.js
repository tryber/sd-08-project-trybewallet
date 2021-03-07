import React from 'react';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import ListOfInputs from '../components/ListOfInputs';
// import { Link } from 'react-router-dom';
// import { Button, Select } from '../components/index';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormInput />
        <ListOfInputs />
      </>
    );
  }
}

export default Wallet;
