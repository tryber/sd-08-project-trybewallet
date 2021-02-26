import React, { Component } from "react";
import { connect } from 'react-redux'
import "./HearderWallet.css";
import store from "../store";

class HearderWallet extends Component {
   
render() {
  const stores = store.getState().UserInfo
  console.log(stores)
  return (
      <>
        <div className="limiter-header-wallet">
          <div className="container-header-wallet container-header-wallet-bg">
            <div className="wrap-header-wallet">
                <span className="header-wallet-logo"></span>
                <span data-testid="email-field" className="header-wallet-title-right ">Despesas Totais: R$ 1500,00</span>
                 <span data-testid="email-field" className="header-wallet-title-left">{stores.email}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapSatateToProps = (state) =>({
  email: state.get_User_Email,
})

export default connect (mapSatateToProps, null)(HearderWallet);
