import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((acc, cur) => {
      const value = parseFloat(cur.value);
      const rate = parseFloat(cur.)
    })
  }

  render() {
    return(

    );
  }
}
