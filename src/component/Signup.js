import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dob: Yup.date().required("Date of birth is required"),
});

const SignupPage = () => {
  const [data, setData] = useState({});
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setData(values);
  };
  console.log("data", data);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="w-auto">
        <h2 className="text-center">Sign Up</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "", dob: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label className="mt-3" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label className="mt-3" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label className="mt-3" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label className="mt-3" htmlFor="dob">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  name="dob"
                  id="dob"
                  className="form-control"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary mt-3"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <div className="mt-3">
                <p>
                  Already a User? <Link to={"/login"}>Login</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;
