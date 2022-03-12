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
import CreateUpdateHelp from "../pages/CreateUpdateHelp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "../Components/Categories";
import ActivateAccount from "../pages/ActivateAccount";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import LikedHelps from "../pages/LikedHelps";
import Profile from "../pages/Profile";

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
        <Route path="/create-help" component={CreateUpdateHelp} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/forget" component={SetNewPassword} />
        <PrivateRoute
          path="/edit-help/:help_slug"
          component={CreateUpdateHelp}
        />
        <PrivateRoute path="/my-helps" component={MyHelps} />
        <PrivateRoute path="/my-liked-helps" component={LikedHelps} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default Routes;
