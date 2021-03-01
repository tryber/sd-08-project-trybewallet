import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="bg-info d-flex justify-content-between p-5 shadow">
        <div className="border-bottom border-light my-auto p-3">
          <span
            data-testid="header-currency-field"
            className="text-white"
          >
            BRL
          </span>
          <br />
          <p data-testid="total-field" className="text-danger text-center m-auto">0</p>
        </div>
        <h1 className="lead">Minha Carteira</h1>
        <span
          data-testid="email-field"
          className="border-bottom border-light my-auto p-3"
        >
          <strong className="text-white">
            Welcome
          </strong>
          <br />
          { email }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
