import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies as getCurrencies } from '../actions';
import { ExpensesTable, Header, NewExpenseForm, EditExpenseForm } from '../components';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <main className="wallet-main">
        <Header />
        { isEditing ? <EditExpenseForm /> : <NewExpenseForm />}
        <ExpensesTable />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  isEditing: PropTypes.bool,
  fetchCurrencies: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  isEditing: false,
};
// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import WalletHeader from '../components/WalletHeader';
// import WalletForm from '../components/WalletForm';
// import WalletTable from '../components/WalletTable';
// import WalletEditForm from '../components/WalletEditForm';
// import { requestCurrencies as requestCurrenciesAction } from '../actions/wallet';

// class Wallet extends React.Component {
//   componentDidMount() {
//     const { requestCurrencies } = this.props;
//     requestCurrencies();
//   }

//   render() {
//     const { isEditing } = this.props;
//     return (
//       <div>
//         <WalletHeader />
//         {isEditing ? <WalletEditForm /> : <WalletForm />}
//         <WalletTable />
//       </div>);
//   }
// }

// const mapStateToProps = (state) => ({
//   isEditing: state.wallet.isEditing,
// });

// const mapDispatchToProps = (dispatch) => ({
//   requestCurrencies: () => dispatch(requestCurrenciesAction()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// Wallet.propTypes = {
//   isEditing: PropTypes.bool,
//   requestCurrencies: PropTypes.func.isRequired,
// };

// Wallet.defaultProps = {
//   isEditing: false,
// };
