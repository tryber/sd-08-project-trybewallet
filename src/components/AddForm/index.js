import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Form from '../Form';
import { Creators as Actions } from '../../actions';

const placeHolder = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class AddForm extends React.Component {
  render() {
    const { fetchQuotation } = this.props;
    return (
      <Form
        placeHolder={ placeHolder }
        onFormSubmit={ fetchQuotation }
        buttonLabel="Adicionar despesa"
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

AddForm.propTypes = {
  fetchQuotation: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddForm);
