import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: loginSchema,
  });
  return (
    <div class="container col-md-6">
      <h1>Login</h1>
      <hr />
      <form class="row g-3" onSubmit={loginForm.handleSubmit}>
        <div class="">
          <label for="email" class="form-label">
            Email*
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            required
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
          />
        </div>
        <div class="">
          <label for="password" class="form-label">
            Password*
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            onChange={loginForm.handleChange}
            value={loginForm.values.password}
          />
        </div>
        <div class="col-12">
          <button onClick={() => {}} class="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="row">
        <small className="col-sm-12">
          Need an account? <Link to="/signup">Sign Up</Link>
        </small>
        <small className="col-sm-12">
          <Link to="/login">Forget Password?</Link>
        </small>
      </div>
    </div>
  );
};

export default Login;
