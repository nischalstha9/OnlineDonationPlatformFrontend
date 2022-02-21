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
import HelpsList from "../pages/HelpsList";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/helps" component={HelpsList} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routes;
