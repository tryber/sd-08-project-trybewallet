import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseWithRates } from '../actions';

import Form from './Form';

class TemplateAdd extends React.Component {
  render() {
    const initialState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    };
    const { addExpenses } = this.props;
    return (
      <Form
        buttonText="Adicionar despesa"
        initialState={ initialState }
        buttonAction={ addExpenses }
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expenses) => dispatch((addExpenseWithRates(expenses))),
});

TemplateAdd.propTypes = {
  addExpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(TemplateAdd);
