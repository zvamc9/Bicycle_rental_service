import React from "react";
import css from "./message.module.css";
import SecondaryButton from "../SecondaryButton";

const Message = (props) => {
  const { message, onClick } = props;
  return (
    <div className={css.message}>
      <h4 className={css.h4}>{message}</h4>
      <SecondaryButton
        title={"Назад"}
        type={"button"}
        onClick={onClick}
        className={css.button}
      />
    </div>
  );
};

export default Message;