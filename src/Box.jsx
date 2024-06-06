import React from "react";
import "./box.css";

const Box = ({ color, onClick }) => {
  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></div>
  );
};

export default Box;
