import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAPI from '../services/requestAPI';
import { actionCurruncies } from '../actions';
import FormLabel from './FormLabel';
import FormSelectMethod from './FormSelectMethod';
import FormSelectTag from './FormSelectTag';
import FormSelectCurrencies from './FormSelectCurrencies';

class FormExpense extends Component {
  componentDidMount() {
    const { showCurrencies } = this.props;
    const api = getAPI();
    showCurrencies(api);
  }

  render() {
    return (
      <section>

        <form>

          <FormLabel />
          <FormSelectCurrencies />
          <FormSelectMethod />
          <FormSelectTag />

        </form>
      </section>
    );
  }
}

const mapDispactToProps = (dispatch) => ({
  showCurrencies: (value) => dispatch(actionCurruncies(value)),
});

export default connect(null, mapDispactToProps)(FormExpense);
