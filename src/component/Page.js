import React from "react";
import Card from "./Card";
import { names } from "./util";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Page = () => {
  const nav = useNavigate();
  // const user = useSelector((store) => store.user);
  // const name = user?.userData?.name;
  const name = window.localStorage.getItem("userName");
  console.log(name);

  const navCreate = () => {
    nav("/createp");
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userName");
    nav("/login");
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex flex-column my-4">
        <div className="d-flex justify-content-between">
          <h1>
            Welcome <span>{name}</span>
          </h1>
          <button onClick={navCreate} className="btn btn-danger">
            Create a project
          </button>
          <button onClick={handleLogout} className="btn ">
            logout
          </button>
        </div>
        <div className="d-flex">
          {names.map((i, k) => {
            return <Card key={k} name={i.projName} date={i.timestamp} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
