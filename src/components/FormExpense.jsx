import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAPI, { getCurrencies } from '../services/requestAPI';
import { actionCurruncies, actionExpenses } from '../actions';
import FormLabel from './FormLabel';
import FormSelectMethod from './FormSelectMethod';
import FormSelectTag from './FormSelectTag';
import FormSelectCurrencies from './FormSelectCurrencies';

class FormExpense extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addOne = this.addOne.bind(this);
  }

  componentDidMount() {
    const { showCurrencies } = this.props;
    const api = getAPI();
    showCurrencies(api);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  addOne() {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleClick() {
    const { showExpenses } = this.props;
    const { state } = this;
    this.addOne();
    showExpenses(state);
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    console.log(getCurrencies());
    return (
      <section>

        <form>

          <FormLabel
            value={ value }
            description={ description }
            handleChange={ this.handleChange }
          />
          <FormSelectCurrencies
            currency={ currency }
            handleChange={ this.handleChange }
          />
          <FormSelectMethod method={ method } handleChange={ this.handleChange } />
          <FormSelectTag tag={ tag } handleChange={ this.handleChange } />
          <button type="button" onClick={ this.handleClick }> Adicionar despesa </button>
        </form>
      </section>
    );
  }
}

const mapDispactToProps = (dispatch) => ({
  showCurrencies: (value) => dispatch(actionCurruncies(value)),
  showExpenses: (UPexpenses) => dispatch(actionExpenses(UPexpenses)),
});

export default connect(null, mapDispactToProps)(FormExpense);
