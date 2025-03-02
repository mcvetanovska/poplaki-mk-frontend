import React from "react";

const CustomContainer = ({ children, minHeight }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: `${minHeight}vh`, width: "80%", margin: "0 auto" }}>
      {children}
    </div>
  );
};

export default CustomContainer;
