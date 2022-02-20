import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = () => {
  const signUpForm = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="container col-md-6">
      <h1>Sign Up</h1>
      <hr />
      <form className="row g-3" onSubmit={signUpForm.handleSubmit}>
        <div className="col-md-6">
          <label for="first_name" className="form-label">
            First name:
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            onChange={signUpForm.handleChange}
            value={signUpForm.values.first_name}
            required
          />
        </div>
        <div className="col-md-6">
          <label for="last_name" className="form-label">
            Last name:
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            onChange={signUpForm.handleChange}
            value={signUpForm.values.last_name}
            required
          />
        </div>
        <div className="">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={signUpForm.handleChange}
            value={signUpForm.values.email}
            required
          />
        </div>
        <div className="">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={signUpForm.handleChange}
            value={signUpForm.values.password}
            required
          />
        </div>
        <div className="">
          <label for="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password2"
            onChange={signUpForm.handleChange}
            value={signUpForm.values.password2}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
      <small>
        Already have an account? <Link to="/login">Login</Link>
      </small>
    </div>
  );
};

export default SignUp;
