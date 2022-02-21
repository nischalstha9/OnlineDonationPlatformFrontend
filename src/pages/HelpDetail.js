import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import HelpCard from "../Components/HelpCard";
import HelpFilter from "../Components/HelpFilter";
import { Pagination } from "@mui/material";

const HelpDetail = () => {
  return (
    <Container component="main" sx={{ marginBottom: "25vh", marginTop: "4vh" }}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: "2vh" }}>
        Help Detail
        <hr />
      </Typography>
      <Grid container sx={{ display: "flex", flexDirection: "" }} spacing={2}>
        <Grid item xs={12} md={4}>
          <HelpFilter />
        </Grid>
        <Grid container item xs={12} sm={12} md={8} spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HelpCard />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end">
          <Pagination />
        </Box>
      </Grid>
    </Container>
  );
};

export default HelpDetail;
