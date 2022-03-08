import { ThemeProvider } from "@mui/material";
import React from "react";
import Routes from "./routes/Routes";
import theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import { insert_user, log_in } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  let user = {};
  if (token) {
    user = JSON.parse(localStorage.getItem("user"));
    dispatch(log_in());
    dispatch(insert_user(user));
  }
  const isAuthenticated = useSelector((state) => state.authenticated);
  return (
    <ThemeProvider theme={theme}>
      <Routes isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
}

export default App;
