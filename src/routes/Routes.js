import React from "react";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navbar from "../Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
