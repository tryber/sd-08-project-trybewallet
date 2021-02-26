import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <section>
        <h4 data-testid="email-field">{ email }</h4>
        <table>
          <thead>
            <tr>
              <th>Total de Gastos</th>
              <th>Câmbio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-testid="total-field">0</td>
              <td data-testid="header-currency-field">BRL</td>
            </tr>
          </tbody>
        </table>
        <ExpensesForm />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
