import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getRequest from '../actions/wallet';
import Select from '../components/FormSelect';
import addExpense from '../actions/Submit';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
    };
    this.handleTotal = this.handleTotal.bind(this);
  }

  async componentDidMount() {
    const { getFetch } = this.props;
    await getFetch();
  }

  handleTotal() {
    const { obj, expenses } = this.props;
    const newObj = Object.values(obj).filter((name) => name.name !== 'Dólar Turismo')
      .map((data) => data);
    const expense = expenses.filter((id) => id.id >= 0);
    const convertedValueTotal = expense.map((value) => {
      const currency = Number(newObj.find((item) => item.code === value.moeda).ask);
      return Number(value.valor) * currency;
    });

    const totalValue = convertedValueTotal.reduce((acc, cur) => {
      acc += cur;
      return acc;
    }, 0);
    return totalValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <header>
          TrybeWallet
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            Despesa total:
            {' R$'}
            {this.handleTotal()}
          </p>
          <p data-testid="header-currency-field">
            Moeda:
            {' '}
            { currency }
          </p>
        </header>
        <section>
          <Select />
        </section>
        <section>
          <Table />
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  obj: state.wallet.obj,
  expenses: state.addExpense.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getFetch: () => dispatch(getRequest()),
  submit: (data) => dispatch(addExpense(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getFetch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  obj: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
