import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dob: Yup.date().required("Date of birth is required"),
});

const SignupPage = () => {
  const [formData, setData] = useState({});
  // const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log(values);
    setData(values);

    try {
      const response = await axios.post(
        "http://localhost:3001/user/addUser",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data posted successfully", response.data);

      resetForm();
    } catch (error) {
      console.error("Error posting data", error);
      // Handle error if needed
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  // const postData = async (values, { setSubmitting }) => {
  //   try {

  //     const response = await axios.post(
  //       "http://localhost:3001/user/addUser",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Data posted successfully", response.data);
  //     // Reset formData after successful post if needed
  //     setData({});
  //   } catch (error) {
  //     console.error("Error posting data", error);
  //     // setError("Error posting data");
  //   }
  // };
  return (
    <>
      <Navbar />
      <div className="container d-flex mt-2 justify-content-center vh-100">
        <div className="w-auto">
          <h2 className="text-center">Sign Up</h2>
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              dob: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className="mt-2" htmlFor="name">
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
                  <label className="mt-2" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label className="mt-2" htmlFor="email">
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
                  <label className="mt-2" htmlFor="password">
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
                  <label className="mt-2" htmlFor="dob">
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
                  className="btn btn-primary mt-2"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>

                <div className="mt-2">
                  <p>
                    Already a User? <Link to={"/login"}>Login</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
