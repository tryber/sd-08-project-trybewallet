import React, { Component } from 'react';

class HeaderWallet extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ userEmail }</span>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
  };
}

export default connect(mapStateToProps)(HeaderWallet);
