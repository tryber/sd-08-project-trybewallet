import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions, { expense } from '../actions/index';
import FormBody from './formBody';

const despesasTipos = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class FormInputs extends React.Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.reqButton = this.reqButton.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  reqButton() {
    const { expenses } = this.props;
    const { id, value, description,
      currency, method, tag } = this.state;
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((data) => {
          const obj = {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: data,
          };
          expenses(obj);
          this.setState({ id: id + 1, value: '', description: '' });
        })
    );
  }

  render() {
    const { stateRedux } = this.props;

    return (
      <div>
        <form>
          <FormBody handleinput={ this.handleInput } stateRedux={ stateRedux } />
          <label htmlFor="metodopagamlabel">
            Método de pagamento:
            <select
              data-testid="method-input"
              onChange={ this.handleInput }
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categorialabel">
            Categoria da despesa
            <select data-testid="tag-input" name="tag">
              {despesasTipos.map((despesa) => (
                <option
                  key={ despesa }
                  value={ despesa }
                >
                  {despesa}
                </option>))}
            </select>
          </label>
          <button
            type="button"
            onClick={ this.reqButton }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateRedux: state.wallet.currencies,

});
const mapDispateToProps = (dispatch) => ({
  fetchData: () => dispatch(actions()),
  expenses: (data) => dispatch(expense(data)),

});

FormInputs.propTypes = {
  fetchData: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  stateRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispateToProps)(FormInputs);
