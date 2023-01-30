import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import css from "./listOfCases.module.css";
import {
  deleteCase,
  getAllCases,
  handleClickMessageButton,
} from "../../store/Reducers/casesReducer";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";

const ListOfCases = (props) => {
  const {
    cases,
    getAllCases,
    deleteCase,
    isLoading,
    message,
    handleClickMessageButton,
  } = props;

  const navigate = useNavigate();

  useEffect(() => {
    getAllCases();
  }, []);

  const handleRowClick = (id, e) => {
    navigate(`/cases/${id}`);
    e.stopPropagation();
  };

  const handleButtonClick = (id, e) => {
    deleteCase(id);
    e.stopPropagation();
  };

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {message ? (
            <Message message={message} onClick={handleClickMessage} />
          ) : (
            <div className={"wrapper"}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Лицензионный номер</th>
                    <th scope="col" className={css.th3}>
                      Тип
                    </th>
                    <th scope="col" className={css.th4}>
                      Цвет
                    </th>
                    <th scope="col" className={css.th5}>
                      Описание
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cases.map((item, index) => {
                    return (
                      <tr
                        className="cursor"
                        key={item._id}
                        onClick={(e) => handleRowClick(item._id, e)}
                      >
                        <th scope="row" className={css.cell1}>
                          {index + 1}
                        </th>

                        <td className={css.cell2}>{item.licenseNumber}</td>

                        <td className={css.cell3}>
                          {(item.type === "sport" && "Sport") ||
                            (item.type === "general" && "General")}
                        </td>

                        <td className={css.cell4}>{item.color}</td>

                        <td className={css.cell5}>{item.description}</td>
                        <th className={css.cell6}>
                          <SecondaryButton
                            title={"Удалить"}
                            type={"button"}
                            className={"btn-sm"}
                            id={item._id}
                            onClick={(e) => handleButtonClick(item._id, e)}
                          />
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default connect(
  (state) => {
    return {
      cases: state.casesReducer.cases,
      isLoading: state.casesReducer.isLoading,
      message: state.casesReducer.message,
    };
  },
  (dispatch) => {
    return {
      deleteCase: (id) => dispatch(deleteCase(id)),
      getAllCases: () => dispatch(getAllCases()),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(ListOfCases);