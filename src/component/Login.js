import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Logged in successfully", response.data);

      dispatch(addUser(response.data));
      localStorage.setItem("userName", response.data?.userData?.name);

      resetForm();
      nav("/page");
    } catch (error) {
      console.error("Error posting data", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="w-auto">
          <h2 className=" text-center">Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="d-flex flex-column justify-content-center">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary mt-2"
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>

                <div className="mt-3">
                  <p>
                    Need an Account? <Link to={"/signup"}>Signup</Link>
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

export default LoginPage;
