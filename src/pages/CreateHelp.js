import React from "react";
import * as Yup from "yup";
import { Container, Grid, Typography, Paper, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import CategoriesDropdown from "../Components/CategoriesDropdown";

const CreateHelp = () => {
  const DonationFormValidationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
    password: Yup.string().required("Password cannot be empty!"),
    password2: Yup.string()
      .required("Enter Your Password Again!")
      .test("matchPassword", "Both passwords must match!", (value) => {
        return value === createDonationForm.values.password2;
      }),
  });
  const createDonationForm = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      contact: "",
      active: false,
    },
    onSubmit: (values, { isSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      isSubmitting(false);
    },
    validationSchema: DonationFormValidationSchema,
  });
  return (
    <Container component="main">
      <Typography component="h1" variant="h3">
        Create New Help
      </Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid item xl={6}>
          <Paper sx={{ padding: "10px" }}>
            <Typography variant="h5" component="h5">
              Donation Form Will Render Here
            </Typography>
          </Paper>
        </Grid>
        <Grid
          container
          item
          xl={6}
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h4" component="h4">
              Enter Donation Details
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              autoComplete=""
              name="title"
              required
              fullWidth
              id="title"
              label="Help Title"
              autoFocus
              onChange={createDonationForm.handleChange}
              value={createDonationForm.values.title}
              required
              error={
                createDonationForm.touched.title &&
                Boolean(createDonationForm.errors.title)
              }
              helperText={
                createDonationForm.touched.title &&
                createDonationForm.errors.title
              }
            />
          </Grid>
          <Grid item>
            <CategoriesDropdown
              setCategoryFilter={(category) => {
                createDonationForm.values.category(category);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              autoComplete=""
              name="location"
              required
              fullWidth
              id="location"
              label="Location"
              autoFocus
              onChange={createDonationForm.handleChange}
              value={createDonationForm.values.location}
              required
              error={
                createDonationForm.touched.location &&
                Boolean(createDonationForm.errors.location)
              }
              helperText={
                createDonationForm.touched.location &&
                createDonationForm.errors.location
              }
            />
          </Grid>
          <Grid item>
            <TextField
              autoComplete=""
              name="contact"
              required
              fullWidth
              id="contact"
              label="Contact"
              autoFocus
              onChange={createDonationForm.handleChange}
              value={createDonationForm.values.contact}
              required
              error={
                createDonationForm.touched.contact &&
                Boolean(createDonationForm.errors.contact)
              }
              helperText={
                createDonationForm.touched.contact &&
                createDonationForm.errors.contact
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateHelp;
