import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";

// import PrivateRoute from './components/core/PrivateRoute';
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/carteira" exact component={Wallet} />
    </Switch>
  );
}
