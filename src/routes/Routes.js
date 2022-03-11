import React from "react";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navbar from "../Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import HelpList from "../pages/HelpList";
import HelpDetail from "../pages/HelpDetail";
import MyHelps from "../pages/MyHelps";
import CreateHelp from "../pages/CreateHelp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "../Components/Categories";
import ActivateAccount from "../pages/ActivateAccount";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Categories />
      <Navbar isAuthenticated={isAuthenticated} />
      <CssBaseline />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/helps" component={HelpList} />
        <Route path="/activate" component={ActivateAccount} />
        <Route path="/help-detail/:help_slug" component={HelpDetail} />
        <Route path="/create-help" component={CreateHelp} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/forget" component={SetNewPassword} />
        <PrivateRoute path="/my-helps" component={MyHelps} />
        <PrivateRoute path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
};

export default Routes;
