import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AxiosInstance from "../AxiosInstance";
import { Button } from "@mui/material";
import { log_out, insert_user } from "../redux/action";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const removeToken = () => {
    AxiosInstance.post("auth/token/blacklist/")
      .then((resp) => {})
      .catch((err) => {})
      .finally(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        dispatch(insert_user({}));
        dispatch(log_out());
      });
  };
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: "5vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Are you sure to logout?
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="error" onClick={removeToken}>
          Logout?
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
