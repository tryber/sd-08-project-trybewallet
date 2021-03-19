import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import FormEdit from '../components/FormEdit';
import Header from '../components/Header';
import Table from '../components/table/Table';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <>
        <Header />
        {editor ? <FormEdit /> : <Form />}
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

// const mapDispatchToProps = {

// }

Wallet.propTypes = {
  editor: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
