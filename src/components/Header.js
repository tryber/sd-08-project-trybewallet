import React from 'react';
import { connect } from 'react-redux'

class Header extends React.Component {

  render() {
    return (
      <div>
        <div data-testid="email-field">
          {this.props.email}
        </div>
        <div data-testid="total-field">
          0
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
})

export default connect(mapStateToProps)(Header);