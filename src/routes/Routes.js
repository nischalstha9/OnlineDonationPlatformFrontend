import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import HelpList from "../pages/HelpList";
import HelpDetail from "../pages/HelpDetail";
import MyHelps from "../pages/MyHelps";
import UsersHelps from "../pages/UsersHelps";
import CreateUpdateHelp from "../pages/CreateUpdateHelp";
import { ToastContainer, toast } from "react-toastify";
import NOT_FOUND from "../pages/404";
import ActivateAccount from "../pages/ActivateAccount";
import ForgetPassword from "../pages/ForgetPassword";
import SetNewPassword from "../pages/SetNewPassword";
import LikedHelps from "../pages/LikedHelps";
import DeleteHelp from "../pages/DeleteHelp";
import Profile from "../pages/Profile";
import Box from "@mui/material/Box";

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.BOTTOM_CENTER}
      />
      <Navbar isAuthenticated={isAuthenticated} />
      <CssBaseline />
      <ScrollToTop />
      <Box sx={{ minHeight: "90vh" }}>
        <Switch>
          <Route exact path="/" component={HelpList} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/helps" component={HelpList} />
          <Route exact path="/activate" component={ActivateAccount} />
          <Route exact path="/help-detail/:help_slug" component={HelpDetail} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/forget" component={SetNewPassword} />
          <Route exact path="/user-helps/:user_id" component={UsersHelps} />
          <PrivateRoute exact path="/my-helps" component={MyHelps} />
          <PrivateRoute
            exact
            path="/delete-help/:help_slug"
            component={DeleteHelp}
          />
          <PrivateRoute
            exact
            path="/create-help"
            component={CreateUpdateHelp}
          />
          <PrivateRoute
            exact
            path="/edit-help/:help_slug"
            component={CreateUpdateHelp}
          />
          <PrivateRoute exact path="/my-liked-helps" component={LikedHelps} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route component={NOT_FOUND} />
        </Switch>
      </Box>
      <Footer />
    </Router>
  );
};

export default Routes;
