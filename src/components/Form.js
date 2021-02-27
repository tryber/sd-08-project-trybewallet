import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies as fetchCurrenciesAction } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleInput = this.handleInput.bind(this);
    // this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueExpense">
          Custo
          <input
            type="number"
            id="valueExpense"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="despesa">
          Descrição
          <input
            type="text"
            id="despesa"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>
        <select
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleInput }
        >
          {currencies.map((item) => (
            <option key={ item } data-testid={ item }>{item}</option>
          ))}
        </select>

        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleInput }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleInput }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import actions from '../../actions';

// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleInput = this.handleInput.bind(this);
//     this.resetState = this.resetState.bind(this);
//     this.state = {
//       value: 0,
//       description: '',
//       currency: '',
//       method: '',
//       tag: '',
//     };
//   }

//   resetState() {
//     this.setState({
//       value: 0,
//       description: '',
//       currency: '',
//       method: '',
//       tag: '',
//     });
//   }

//   render() {
//     const { addExpense, currencies, apiFetchThunk } = this.props;
//     const { value, description, currency, method, tag } = this.state;
//     return (
//       <div>
//         <form>

//

//           <button
//             type="button"
//             onClick={ () => {
//               apiFetchThunk();
//               addExpense(this.state);
//               this.resetState();
//             } }
//           >
//             Adicionar despesa
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = {
//   addExpense: actions.addExpense,
//   apiFetchThunk: actions.apiFetchThunk,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Form);

// Form.propTypes = {
//   apiFetchThunk: PropTypes.func.isRequired,
//   addExpense: PropTypes.func.isRequired,
//   currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
