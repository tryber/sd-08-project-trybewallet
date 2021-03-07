// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import React, { Component } from 'react';

// class WalletHeader extends Component {
//   constructor() {
//     super();

//     this.totalCost = this.totalCost.bind(this);
//   }

//   totalCost() {
//     const { expenses } = this.props;

//     const total = expenses.reduce((totalSum, expenseInfos) => {
//       const { value, currency, exchangeRates } = expenseInfos;
//       const currencyValue = Number(exchangeRates[currency].ask);
//       return totalSum + (value * currencyValue);
//     }, 0);
//     return total.toFixed(2);
//   }

//   render() {
//     const { email } = this.props;
//     return (
//       <header>
//         <h2 data-testid="email-field">{`Seu e-mail é ${email}`}</h2>
//         <h2>
//           Total gasto em R$:
//           <span data-testid="total-field">{this.totalCost()}</span>
//         </h2>
//         <h3
//           data-testid="header-currency-field"
//         >
//           Moeda escolhida: BRL
//         </h3>
//       </header>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   email: state.user.email,
//   expenses: state.wallet.expenses,
// });

// WalletHeader.propTypes = {
//   email: PropTypes.string.isRequired,
//   expenses: PropTypes.arrayOf(PropTypes.object),
// };

// WalletHeader.defaultProps = {
//   expenses: [],
// };

// export default connect(mapStateToProps, null)(WalletHeader);
