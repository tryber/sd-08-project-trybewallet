import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';

import TemplateAdd from '../components/TemplateAdd';
import TemplateEdit from '../components/TemplateEdit';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <>
        <Header />
        {editor ? <TemplateEdit /> : <TemplateAdd />}
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editorMode,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
