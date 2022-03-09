import React from "react";
import * as Yup from "yup";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import CategoriesDropdown from "../Components/CategoriesDropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { FormControl } from "@mui/material";
import { FormHelperText } from "@mui/material";

const CreateHelp = () => {
  const DonationFormValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Too Short!")
      .max(70, "Too Long!")
      .required("Title for your help is needed!"),
    description: Yup.string()
      .min(20, "Too Short!")
      .required("Short description is required."),
    location: Yup.string()
      .min(6, "Too Short!")
      .required("Please give pickup location for your help."),
    contact: Yup.number()
      .min(8, "Too Short!")
      .required("Please give a contact number to make your help reachable."),
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
            <Typography variant="h6" component="h5">
              <hr />
              {parse(createDonationForm.values.title)}
            </Typography>
            <Typography variant="p" component="p">
              Category: {parse(createDonationForm.values.category)}
            </Typography>
            <Typography variant="p" component="p">
              Description: {parse(createDonationForm.values.description)}
              location: {parse(createDonationForm.values.location)}
              contact: {parse(createDonationForm.values.contact)}
              active:{" "}
              {parse(createDonationForm.values.active == true ? "tru" : "fal")}
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
            <FormControl>
              <CKEditor
                editor={ClassicEditor}
                data=""
                name="description"
                onChange={(event, editor) => {
                  createDonationForm.setFieldValue(
                    "description",
                    editor.getData()
                  );
                }}
              />
              <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                {createDonationForm.touched.description &&
                  createDonationForm.errors.description}
              </FormHelperText>
            </FormControl>
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
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={createDonationForm.active}
                  onChange={(e) => {
                    createDonationForm.setFieldValue("active", e.target.value);
                  }}
                />
              }
              label="Active"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={createDonationForm.handleSubmit}
            >
              Create Help
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateHelp;
