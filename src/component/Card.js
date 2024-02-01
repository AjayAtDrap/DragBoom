import React from "react";

const Card = ({ name, date }) => {
  return (
    <div className="d-flex m-2  p-4 text-white bg-dark flex-column ">
      <h3>{name}</h3>
      <div className="d-flex  align-items-center">
        <span>{date}</span>
        <div className="d-flex justify-content-between">
          <button className="m-2 btn btn-primary">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button className="m-2 btn btn-primary">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
      {/* <div>
        <h4>Projects:</h4>
      </div> */}
    </div>
  );
};

export default Card;
