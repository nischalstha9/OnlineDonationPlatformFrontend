import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AxiosInstance from "../AxiosInstance";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";

const Logout = () => {
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
        <Button variant="contained" color="error">
          Logout?
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
