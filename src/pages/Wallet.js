import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        <ExpenseForm key={ editor } />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.defaultProps = {
  editor: false,
};

Wallet.propTypes = {
  editor: PropTypes.bool,
};

const mapStateToProps = ({ wallet }) => ({
  editor: wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
