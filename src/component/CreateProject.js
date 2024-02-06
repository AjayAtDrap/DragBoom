import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [data, setData] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    // try {
    //   axios.post("http://localhost:3001/page/addPage");
    // } catch (err) {}
  };
  const handleChange = (e) => {
    // console.log(e.target.value);
    const eData = e.target.value;
    setData(eData);
  };
  console.log(data);
  return (
    <div className="container-fluid d-flex flex-column vh-100 justify-content-center align-items-center">
      <h1>DragBoom</h1>
      <div className="d-flex flex-column">
        <form>
          <label className="" htmlFor="name">
            Name
          </label>
          <input
            onChange={handleChange}
            value={data}
            className="form-control"
            type="text"
            id="name"
            name="name"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success mt-2 "
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
