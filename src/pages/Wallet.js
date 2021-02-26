import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchMoney from '../actions/fetch';
import saveExpense from '../actions/saveExpense';

import Value from '../components/Value';
import Description from '../components/Description';
import Currency from '../components/Currency';
import Method from '../components/Method';
import Tag from '../components/Tag';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      total: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getMoney } = this.props;
    getMoney();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { value, description, currency, method, tag, total } = this.state;
    const { getMoney, fillType, sendExpense, expenseList } = this.props;
    getMoney();
    const object = {
      id: expenseList.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: fillType[0],
    };
    sendExpense(object);
    const multiplier = fillType && fillType.length && fillType[0][currency].ask;
    this.setState({
      value: '',
      total: (total + (value * multiplier)),
    });
  }

  render() {
    const { userEmail, fillType } = this.props;
    const { total, value } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ userEmail }</p>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <Value func={ this.handleChange } value={ value } />
          <Description func={ this.handleChange } />
          <Currency func={ this.handleChange } fill={ fillType } />
          <Method func={ this.handleChange } />
          <Tag func={ this.handleChange } />
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getMoney: PropTypes.func.isRequired,
  fillType: PropTypes.shape(
    PropTypes.object.isRequired,
  ).isRequired,
  sendExpense: PropTypes.func.isRequired,
  expenseList: PropTypes.shape(
    PropTypes.array.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  fillType: state.wallet.currencies,
  expenseList: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getMoney: () => dispatch(fetchMoney()),
  sendExpense: (data) => dispatch(saveExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
