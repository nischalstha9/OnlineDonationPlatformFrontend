import { ThemeProvider, createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#aeccb8",
    },
    secondary: {
      main: "#80c4a2",
    },
    background: {
      default: "#fdf6f6",
      paper: "",
    },
  },
  props: {
    MuiAppBar: {
      color: "default",
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
  },
});

export default Theme;
