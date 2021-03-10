import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      despesa: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { despesa } = this.state;
    console.log(email);
    return (
      <div className="header">
        <h3 data-testid="email-field">{ email }</h3>
        <p data-testid="total-field">{ despesa }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
