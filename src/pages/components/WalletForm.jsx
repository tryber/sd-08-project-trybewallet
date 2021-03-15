import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currencyFetchAction from '../../actions/currencyFetchAction';
import addExpenseAction from '../../actions/addExpenseAction';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    return currencyFetch();
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { currencies, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <input id="value" data-testid="value-input" value={ value } onChange={ this.handleChange } />

        <input id="description" data-testid="description-input" value={ description } onChange={ this.handleChange } />

        <select id="currency" data-testid="currency-input" value={ currency } onChange={ this.handleChange }>
          {currencies.map((eachCurrency) => (
            <option
              data-testid={ eachCurrency }
              key={ eachCurrency }
            >
              {eachCurrency}
            </option>))}
        </select>

        <select id="method" data-testid="method-input" value={ method } onChange={ this.handleChange }>
          {this.paymentMethods
            .map((eachMethod) => <option key={ eachMethod }>{eachMethod}</option>)}
        </select>

        <select id="tag" data-testid="tag-input" value={ tag } onChange={ this.handleChange }>
          {this.expenseTags.map((eachTag) => <option key={ eachTag }>{eachTag}</option>)}
        </select>

        <button
          type="button"
          onClick={ () => {
            const expense = {
              value,
              description,
              currency,
              method,
              tag,
            };
            addExpense(expense);
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(currencyFetchAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencyFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
