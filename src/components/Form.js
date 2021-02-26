import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpense } from '../actions';

import { currencyList, methodList, tagList } from './Lists';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      exp: 0,
      des: '',
      cur: '',
      met: '',
      tag: '',
    };

    this.getInfos = this.getInfos.bind(this);
  }

  componentDidUpdate() {
    const { id } = this.state;
    const { expensesInfo } = this.props;
    if (expensesInfo.length !== id) return this.setID(expensesInfo.length);
  }

  setID(num) {
    this.setState({
      id: num,
    });
  }

  getInfos(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { id, exp, des, cur, met, tag } = this.state;
    const { addExp } = this.props;
    return (
      <form>
        <input
          type="number"
          value={ exp }
          onChange={ (e) => this.setState({ exp: e.target.value }) }
          data-testid="value-input"
        />
        <input
          type="text"
          value={ des }
          onChange={ (e) => this.setState({ des: e.target.value }) }
          data-testid="description-input"
        />
        <select
          value={ cur }
          onChange={ (e) => this.setState({ cur: e.target.value }) }
          data-testid="currency-input"
        >
          {currencyList.map(
            (item, index) => <option key={ index } data-testid={ item }>{item}</option>,
          )}
        </select>
        <select
          value={ met }
          onChange={ (e) => this.setState({ met: e.target.value }) }
          data-testid="method-input"
        >
          {methodList.map((item, index) => <option key={ index }>{item}</option>)}
        </select>
        <select
          value={ tag }
          onChange={ (e) => this.setState({ tag: e.target.value }) }
          data-testid="tag-input"
        >
          {tagList.map((item, index) => <option key={ index }>{item}</option>)}
        </select>
        <button type="button" onClick={ () => addExp({ id, exp, des, cur, met, tag }) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExp: (info) => dispatch(addExpense(info)),
});

const mapStateToProps = (state) => ({
  expensesInfo: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  addExp: PropTypes.func.isRequired,
  expensesInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};
