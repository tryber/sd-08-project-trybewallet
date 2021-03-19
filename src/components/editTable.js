import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpence,
  expenceData,
  fetchGetQuotation,
  updateExpence } from '../actions/index';
import { getQuotation as getActualQuotation } from '../service/awesomeAPI';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    const { currencyData: { expenses }, expenceToEdit } = this.props;
    const toEdit = expenses.filter((expense) => expense.id === expenceToEdit);
    console.log(toEdit[0]);

    this.state = {
      id: toEdit[0].id,
      value: toEdit[0].value,
      description: toEdit[0].description,
      currency: toEdit[0].currency,
      method: toEdit[0].method,
      tag: toEdit[0].tag,
      exchangeRates: toEdit[0].exchangeRates,
    };

    this.handleChange = this.handleChange.bind(this);
    this.gererateID = this.gererateID.bind(this);
    this.zeraTudo = this.zeraTudo.bind(this);
    this.juntaTudo = this.juntaTudo.bind(this);
  }

  componentDidMount() {
    const { getQuotation } = this.props;
    getQuotation();
  }

  gererateID() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
    });
  }

  async juntaTudo() {
    const { setExpences } = this.props;
    const rates = await getActualQuotation();
    this.setState({
      exchangeRates: rates,
    }, () => { setExpences(this.state); this.zeraTudo(); });
  }

  zeraTudo() {
    this.setState({
      value: 0,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  expenceForm() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="description">
          Despesa
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            data-testid="value-input"
            id="description"
            placeholder={ value }
          />
        </label>
        <label htmlFor="expence">
          Descrição da despesa
          <input
            onChange={ this.handleChange }
            value={ description }
            name="description"
            data-testid="description-input"
            id="expence"
          />
        </label>
      </>
    );
  }

  currencies() {
    const { currency } = this.state;
    const { currencyData } = this.props;
    const currencieWhithoutUSDT = currencyData.currencies
      .filter((currencie) => currencie !== 'USDT');
    return (
      <label htmlFor="currencie">
        Escolha a moeda
        <select
          onChange={ this.handleChange }
          name="currency"
          id="currencie"
          data-testid="currency-input"
          value={ currency }
        >
          { currencieWhithoutUSDT.map((currencie, index) => (
            <option
              data-testid={ currencie }
              key={ index }
              value={ currencie }
            >
              {currencie}
            </option>))}
        </select>
      </label>
    );
  }

  paymentMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="paymentMethod">
        Metodo de pagamento
        <select
          onChange={ this.handleChange }
          name="method"
          id="paymentMethod"
          data-testid="method-input"
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  categoryExpence() {
    const { tag } = this.state;
    return (
      <label htmlFor="categoryExpence">
        Categoria da despesa
        <select
          onChange={ this.handleChange }
          name="tag"
          id="categoryExpence"
          data-testid="tag-input"
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { currencyData, expenceToEdit,
      updateExpenceFunction,
      editExpenceFunction } = this.props;
    console.log(expenceToEdit);

    return (
      <>
        {this.expenceForm()}
        { (currencyData.currencies) && this.currencies() }
        { this.paymentMethod()}
        { this.categoryExpence()}
        <button
          type="button"
          onClick={ () => {
            updateExpenceFunction(this.state);
            editExpenceFunction('');
          } }
        >
          Editar despesa
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyData: state.wallet,
  expenceToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenceFunction: (id) => dispatch(editExpence(id)),
  getQuotation: () => dispatch(fetchGetQuotation()),
  setExpences: (ops) => dispatch(expenceData(ops)),
  updateExpenceFunction: (expenceEdited) => dispatch(updateExpence(expenceEdited)),
});

EditForm.propTypes = {
  getQuotation: PropTypes.func.isRequired,
  updateExpenceFunction: PropTypes.func.isRequired,
  editExpenceFunction: PropTypes.func.isRequired,
  setExpences: PropTypes.func.isRequired,
  expenceToEdit: PropTypes.func.isRequired,
  currencyData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
