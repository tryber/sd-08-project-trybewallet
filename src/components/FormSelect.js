import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Select extends React.Component {
  constructor() {
    super();

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    const { obj } = this.props;
    const newObj = Object.values(obj).filter((name) => name.name !== 'Dólar Turismo')
      .map((data) => data.code);

    return (
      <div>
        <select>
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

  render() {
    const payMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        {this.handleSelect()}
        <select>
          {payMethods
            .map((methods) => (
              <option data-testid="method-input" key={ methods }>{methods}</option>))}
        </select>
        <select>
          {tag
            .map((tags) => (
              <option data-testid="tag-input" key={ tags }>{tags}</option>))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  obj: state.wallet.obj,
});

Select.propTypes = {
  obj: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Select);
