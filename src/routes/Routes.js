import React from "react";
import About from "../pages/About";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Navbar from "../Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import HelpsList from "../pages/HelpList";
import MyHelps from "../pages/MyHelps";
import CreateHelp from "../pages/CreateHelp";

const Routes = ({ isAuthenticated }) => {
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <CssBaseline />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/helps" component={HelpsList} />
          <Route path="/create-help" component={CreateHelp} />
          <PrivateRoute path="/my-helps" component={MyHelps} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routes;
