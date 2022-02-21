import { ThemeProvider } from "@mui/material";
import React from "react";
import Routes from "./routes/Routes";
import theme from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
