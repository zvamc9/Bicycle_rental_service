import React from "react";

const MainButton = (props) => {
  const { title, type, className, disabled, onClick } = props;
  return (
    <button
      className={`btn btn-primary ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MainButton;