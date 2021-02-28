import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <div>
        teste do Header
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);
