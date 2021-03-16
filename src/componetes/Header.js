import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{user.email}</p>
        <p data-testid="total-field">
          {expenses.map((e) => Number(e.value))
            .reduce((acc, curr) => acc + curr, 0)}
        </p>
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
  }).isRequired,
  map: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
