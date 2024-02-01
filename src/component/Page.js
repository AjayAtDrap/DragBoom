import React from "react";
import Card from "./Card";
import { names } from "./util";

const Page = () => {
  console.log(names);
  return (
    <div className="container-fluid d-flex flex-column my-4">
      <div className="d-flex justify-content-between">
        <h1>Welcome</h1>
        <button className="btn btn-danger">Create a project</button>
      </div>
      <div className="d-flex">
        {names.map((i) => {
          return <Card name={i.projName} date={i.timestamp} />;
        })}
      </div>
    </div>
  );
};

export default Page;
