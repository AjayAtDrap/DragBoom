import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark text-white">
      <ul className="d-flex list-unstyled  ">
        <li className="mx-2">
          <a className="text-decoration-none" href="/page">
            Page
          </a>
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
    </nav>
  );
};

export default Navbar;
