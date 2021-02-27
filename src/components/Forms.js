import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import Payments from './Payments';
import Select from './Select';
import Categories from './Category';
import { currentExpensive } from '../actions/expensive';

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFetch() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    return (
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((response) => {
          const expensive = {
            id,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: response,
          };
          addExpense(expensive);
          this.setState({
            id: id + 1,
            value: '',
            description: '',
            currency: '',
            method: '',
            tag: '',
          });
        })
    );
  }

  render() {
    const { value } = this.state;
    return (
      <form>
        <Input
          value={ value }
          onChange={ this.onChange }
          name="value"
          datatestid="value-input"
        >
          {'Valor da despesa: '}
        </Input>
        <Input
          value={ value }
          onChange={ this.onChange }
          name="description"
          datatestid="description-input"
        >
          {'Descrição da despesa: '}
        </Input>
        <Select
          onChange={ this.onChange }
          name="currency"
          id="currency-input"
        />
        <Payments
          onChange={ this.onChange }
          name="method"
          datatestid="method-input"
        />
        <Categories
          onChange={ this.onChange }
          name="tag"
          datatestid="tag-input"
        />
        <button type="button" onClick={ this.handleFetch }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (value) => dispatch(currentExpensive(value)),
});

export default connect(null, mapDispatchToProps)(Forms);
