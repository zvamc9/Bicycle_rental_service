import React from "react";

const SecondaryButton = (props) => {
  const { title, type, className, onClick, disabled } = props;
  return (
    <button
      type={type}
      className={`btn btn-outline-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SecondaryButton;