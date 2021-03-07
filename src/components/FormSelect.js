import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addExpense from '../actions/Submit';
import getRequest from '../actions/wallet';

class Select extends React.Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      tages: 'Alimentação',
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleAddExpenses = this.handleAddExpenses.bind(this);
  }

  async handleAddExpenses() {
    const { addExpenses, getFetch } = this.props;
    addExpenses(this.state);
    await getFetch();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSelect() {
    const { moeda } = this.state;
    const { obj } = this.props;
    const newObj = Object.values(obj).filter((name) => name.name !== 'Dólar Turismo')
      .map((data) => data.code);

    return (
      <div>
        <select
          name="moeda"
          onChange={ this.handleChange }
          value={ moeda }
          data-testid="currency-input"
        >
          {newObj.map((codes) => (
            <option
              data-testid={ codes }
              key={ codes }
            >
              { codes }
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleInputs() {
    const { valor, descricao } = this.state;
    return (
      <div>
        <label htmlFor="valor">
          Valor despesa:
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            name="valor"
            type="number"
            value={ valor }
          />
        </label>
        <label htmlFor="descrição">
          Descrição despesa:
          <input
            onChange={ this.handleChange }
            data-testid="description-input"
            name="descricao"
            type="text"
            value={ descricao }
          />
        </label>
      </div>
    );
  }

  render() {
    const { metodo, tages } = this.state;
    const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        {this.handleInputs()}
        {this.handleSelect()}
        <select
          onChange={ this.handleChange }
          name="metodo"
          value={ metodo }
          data-testid="method-input"
        >
          {payMethods
            .map((methods) => (
              <option
                key={ methods }
              >
                {methods}
              </option>))}
        </select>
        <select
          name="tages"
          onChange={ this.handleChange }
          value={ tages }
          data-testid="tag-input"
        >
          {tag
            .map((tags) => (
              <option
                key={ tags }

              >
                {tags}
              </option>))}
        </select>
        <button
          type="button"
          onClick={ this.handleAddExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  obj: state.wallet.obj,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (data) => dispatch(addExpense(data)),
  getFetch: () => dispatch(getRequest()),
});

Select.propTypes = {
  obj: PropTypes.objectOf(PropTypes.object).isRequired,
  addExpenses: PropTypes.func.isRequired,
  getFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
