import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    const valueNumber = expenses.map((e) => Number(e.value));
    const contador = valueNumber.reduce((acc, curr) => acc + curr, 0);

    return (
      <div>
        <p data-testid="email-field">{user.email}</p>
        <p data-testid="total-field">{contador}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.expenses,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  expenses: PropTypes.shape({
    value: PropTypes.string,
    map: PropTypes.func.isRequired,
  }).isRequired,

};

export default connect(mapStateToProps)(Header);
