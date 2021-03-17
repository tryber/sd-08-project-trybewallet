import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currencyFetchAction from '../../actions/currencyFetchAction';
import addExpenseAction from '../../actions/addExpenseAction';
import EditExpense from './EditExpense';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    this.expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    this.handleChange = this.handleChange.bind(this);
    this.addForm = this.addForm.bind(this);
    this.formInputs = this.formInputs.bind(this);
    this.formDropdowns = this.formDropdowns.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    return currencyFetch();
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
  }

  formInputs() {
    const { value, description } = this.state;
    return (
      <>
        <input
          id="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
      </>
    );
  }

  formDropdowns() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <>
        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((eachCurrency) => (
            <option
              data-testid={ eachCurrency }
              key={ eachCurrency }
            >
              {eachCurrency}
            </option>))}
        </select>

        <select
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          {this.paymentMethods
            .map((eachMethod) => <option key={ eachMethod }>{eachMethod}</option>)}
        </select>

        <select
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          {this.expenseTags.map((eachTag) => <option key={ eachTag }>{eachTag}</option>)}
        </select>
      </>
    );
  }

  addForm() {
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        {this.formInputs()}
        {this.formDropdowns()}
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
            this.setState({ value: '' });
          } }
        >
          Adicionar despesa
        </button>
      </>
    );
  }

  render() {
    const { editing } = this.props;
    return (
      <form>
        { editing ? <EditExpense /> : this.addForm() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(currencyFetchAction()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencyFetch: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
