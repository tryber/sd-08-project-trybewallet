import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <main>
        <header>
          <div>TrybeWallet</div>
          ;
          <p data-testid="email-field">{user.email}</p>

          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
        <Form />
        <Table />
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
