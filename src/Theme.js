import { ThemeProvider, createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#39aa57",
    },
    secondary: {
      main: "#80c4a2",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiAppBar: {
      color: "default",
    },
  },
});

export default Theme;
