import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequest } from '../actions/index';

// import styles from '../styles/components/Form.module.css';

const alimentação = 'Alimentação';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.initialState,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleMethods = this.handleMethods.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handlAddExpenses = this.handlAddExpenses.bind(this);
  }

  componentDidMount() {
    const { getFetch } = this.props;
    getFetch();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleInputs() {
    const { value, description } = this.state;
    return (
      <div>
        <label htmlFor="valor">
          Valor despesa:
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            name="value"
            type="number"
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Descrição despesa:
          <input
            onChange={ this.handleChange }
            data-testid="description-input"
            name="description"
            type="text"
            value={ description }
          />
        </label>
      </div>
    );
  }

  handleCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    if (currencies.length > 0) {
      return (
        <select
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          data-testid="currency-input"
        >
          {currencies
            .map((code) => <option data-testid={ code } key={ code }>{code}</option>)}
        </select>
      );
    }
  }

  handleMethods() {
    const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;

    return (
      <select
        onChange={ this.handleChange }
        name="method"
        value={ method }
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
    );
  }

  handleTags() {
    const tages = [alimentação, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;

    return (
      <select
        name="tag"
        onChange={ this.handleChange }
        value={ tag }
        data-testid="tag-input"
      >
        {tages
          .map((tags) => (
            <option
              key={ tags }
            >
              {tags}
            </option>))}
      </select>
    );
  }

  handlAddExpenses() {
    const { buttonAction, initialState } = this.props;
    console.log(buttonAction);
    buttonAction(this.state);
    this.setState({
      ...initialState,
    });
  }

  render() {
    const { buttonText } = this.props;
    return (
      <div className={ styles.form }>
        {this.handleInputs()}
        {this.handleCurrency()}
        {this.handleMethods()}
        {this.handleTags()}
        <button
          type="button"
          onClick={ this.handlAddExpenses }
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getFetch: () => dispatch(getRequest()),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getFetch: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  initialState: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  buttonAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
