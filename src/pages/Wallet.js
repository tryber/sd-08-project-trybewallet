import React, { Component } from "react";
import "./Wallet.css";
import HearderWallet from "./HearderWallet";
import store from "../store";

class Wallet extends Component {
  render() {
    return (
      <>
        <div className="limiter-wallet">
          <div className="container-wallet container-wallet-bg">
          <HearderWallet />
            <div className="wrap-wallet">
              <form name="f1" className="wallet-form validate-form">
                <span className="wallet-form-logo">
                  <i className="zmdi zmdi-landscape"></i>
                </span>

                <span className="wallet-form-title">Log in</span>

                <div
                  className="wrap-input validate-input"
                  data-validate="Enter username"
                >
                  <input
                    data-testid="email-input"
                    className="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <i className=" focus-input" placeholder="&#xf644;"></i>
                </div>

                <div
                  className="wrap-input validate-input"
                  data-validate="Enter password"
                >
                  <input
                    data-testid="password-input"
                    className="input"
                    type="text"
                    name="pass"
                    placeholder="Password"
                  />
                  <span
                    className="focus-input"
                    data-placeholder="&#xf191;"
                  ></span>
                </div>

                <div className="contact-form-checkbox">
                  <input
                    className="input-checkbox"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div className="container-wallet-form-btn">
                  <button
                    name="input-email"
                    type="button"
                    className="wallet-form-btn"
                    value="Entrar"
                  >
                    Entrar
                  </button>
                </div>

                <div className="text-center">
                  <a className="txt1" href="#">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Wallet;
