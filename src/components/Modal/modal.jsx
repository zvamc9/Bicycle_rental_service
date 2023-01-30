import React from "react";
import MainButton from "./MainButton";
import SecondaryButton from "../../components/SecondaryButton";

const Modal = (props) => {
  const {
    title,
    paragraph,
    titleSecondaryButton,
    titleMainButton,
    onClickSecondaryButton,
    onClickMainButton,
    isSecondaryButtonShown,
  } = props;
  return (
    <div className="modal modalShown" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">
            <p>{paragraph}</p>
          </div>
          <div className="modal-footer">
            {isSecondaryButtonShown && (
              <SecondaryButton
                title={titleSecondaryButton}
                type={"button"}
                onClick={onClickSecondaryButton}
              />
            )}
            <MainButton
              title={titleMainButton}
              type={"button"}
              onClick={onClickMainButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;