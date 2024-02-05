import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" bg-dark text-white">
      <ul className="d-flex list-unstyled p-2">
        <li className="mx-2 ">
          <Link className="text-decoration-none" to="/page">
            Page
          </Link>
        </li>
        <li className="mx-2">
          <a className="text-decoration-none" href="/Login">
            Login
          </a>
        </li>
        <li className="mx-2">
          <a className="text-decoration-none" href="/Signup">
            SignUp
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
