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
import NOT_FOUND from "../pages/404";
import ActivateAccount from "../pages/ActivateAccount";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import LikedHelps from "../pages/LikedHelps";
import Profile from "../pages/Profile";

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Navbar isAuthenticated={isAuthenticated} />
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={HelpList} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/helps" component={HelpList} />
        <Route exact path="/activate" component={ActivateAccount} />
        <Route exact path="/help-detail/:help_slug" component={HelpDetail} />
        <Route exact path="/create-help" component={CreateUpdateHelp} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/forget" component={SetNewPassword} />
        <PrivateRoute
          exact
          path="/edit-help/:help_slug"
          component={CreateUpdateHelp}
        />
        <PrivateRoute exact path="/my-helps" component={MyHelps} />
        <PrivateRoute exact path="/my-liked-helps" component={LikedHelps} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="*" component={NOT_FOUND} />
      </Switch>
    </Router>
  );
};

export default Routes;
