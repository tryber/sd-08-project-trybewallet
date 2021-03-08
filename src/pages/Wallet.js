import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';
import WalletTable from '../components/WalletTable';
import EditExpenseForm from '../components/EditExpenseForm';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <section>
        <Header />
        {isEditing ? <EditExpenseForm /> : <ExpenseForm />}
        <WalletTable />
      </section>
    );
  }
}

const mapStateToProps = ({ wallet: { isEditing } }) => ({
  isEditing,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};
