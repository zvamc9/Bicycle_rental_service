import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import css from "./officerDetailPage.module.css";
import officerImage from "../../depictions/images/officerImage.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import {
  editOfficer,
  getOneOfficer,
  handleClickMessageButton,
} from "../../store/Reducers/officersReducer";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";

const OfficerDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    editOfficer,
    isLoading,
    message,
    getOneOfficer,
    officer,
    handleClickMessageButton,
  } = props;

  const [isClickedFirstName, setIsClickedFirstName] = useState(false);
  const [isClickedLastName, setIsClickedLastName] = useState(false);
  const [isClickedPassword, setIsClickedPassword] = useState(false);

  const handleClickFirstName = () => {
    setIsClickedFirstName((prevState) => !prevState);
  };
  const handleClickLastName = () => {
    setIsClickedLastName((prevState) => !prevState);
  };
  const handleClickPassword = () => {
    setIsClickedPassword((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedFirstName(false);
      setIsClickedLastName(false);
    }
  };

  useEffect(() => {
    getOneOfficer(id);
  }, [dispatch, getOneOfficer, id]);

  const handleClickMessage = () => {
    navigate(`/officers`);
    handleClickMessageButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: officer.firstName || "",
        lastName: officer.lastName || "",
        oldPassword: officer.password || "",
        newPassword: "",
        passwordConfirmation: "",
        approved: officer.approved || "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(
          15,
          "?????? ???????? ?????????? ?????????????????? ?????????? 15 ????????????????"
        ),
        lastName: Yup.string().max(
          20,
          "?????? ???????? ?????????? ?????????????????? ?????????? 20 ????????????????"
        ),
        oldPassword: Yup.string(),
        newPassword: Yup.string().when((isClickedPassword, schema) => {
          if (isClickedPassword)
            return schema
              .min(3, "???????????? ???????????? ?????????????????? ???????????? 3 ????????????????")
              .max(12, "???????????? ???????????? ?????????????????? ???????????? 12 ????????????????")
              .required("?????? ???????? ?????????????????????? ?????? ????????????????????");
        }),
        passwordConfirmation: Yup.string()
          .when("password", (isClickedPassword, schema) => {
            if (isClickedPassword)
              return schema.required("?????????????????????????? ???????????? ???????????? ??????????????????????");
          })
          .oneOf([Yup.ref(" newPassword")], "???????????? ???????????? ???????? ??????????????????????"),
        approved: Yup.boolean(),
      })}
      onSubmit={(values) => {
        editOfficer(officer._id, values);
        setIsClickedFirstName(false);
        setIsClickedLastName(false);
        setIsClickedPassword(false);
      }}
    >
      {(formik) => {
        const { values } = formik;
        return (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className={css.wrapper}>
                    <img
                      src={officerImage}
                      className={css.img}
                      alt={"Officer"}
                    />
                    <Form>
                      <table className={`table table-hover ${css.table}`}>
                        <tbody>
                          <tr
                            className={`${css.row} cursor`}
                            onClick={handleClickFirstName}
                          >
                            <td className={css.cell1}>??????</td>
                            <td className={css.cell2}>
                              {!isClickedFirstName ? (
                                values.firstName
                              ) : (
                                <Field
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder={"???????? ??????"}
                                  onKeyPress={handleKeyPress}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                className="invalidMessage"
                                component="div"
                                name="firstName"
                              />
                            </td>
                          </tr>

                          <tr
                            className={`${css.row} cursor`}
                            onClick={handleClickLastName}
                          >
                            <td className={css.cell1}>??????????????</td>
                            <td className={css.cell2}>
                              {!isClickedLastName ? (
                                values.lastName
                              ) : (
                                <Field
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder={"???????? ??????????????"}
                                  onKeyPress={handleKeyPress}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                component="div"
                                name="lastName"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr className={css.row}>
                            <td className={css.cell1}>E-mail</td>
                            <td className={css.cell2}>{officer.email}</td>
                          </tr>

                          {!isClickedPassword && (
                            <tr
                              className={`${css.row} cursor`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>????????????</td>
                              <td className={css.cell2}>
                                {!values.passwordConfirmation
                                  ? values.oldPassword
                                  : values.passwordConfirmation}
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={`${css.row} cursor`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>?????????? ????????????</td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name={"newPassword"}
                                  className="form-control"
                                  placeholder={"?????????????? ?????????? ????????????"}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="newPassword"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          {isClickedPassword && (
                            <tr
                              className={`${css.row} cursor`}
                              onClick={handleClickPassword}
                            >
                              <td className={css.cell1}>
                                ?????????????????????? ?????????? ????????????
                              </td>
                              <td className={css.cell2}>
                                <Field
                                  type="password"
                                  name={"passwordConfirmation"}
                                  className="form-control"
                                  placeholder={"???????????????? ?????????????? ?????????? ????????????"}
                                  onKeyPress={handleKeyPress}
                                  autoComplete="on"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <ErrorMessage
                                  component="div"
                                  name="passwordConfirmation"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          <tr className={css.row}>
                            <td className={css.cell1}>ID</td>
                            <td className={css.cell2}>{officer.clientId}</td>
                          </tr>

                          <tr className={`${css.row} cursor`}>
                            <td className={css.cell1}>??????????????</td>
                            <td className={css.cell2}>
                              <div
                                className={`form - check form-switch ${css.formSwitch}`}
                              >
                                <Field
                                  className={`form-check-input checkboxInput cursor`}
                                  type="checkbox"
                                  name={"approved"}
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={css.btnWrapper}>
                        <SecondaryButton
                          title={"?????????????????? ??????????????????"}
                          type="submit"
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}
          </>
        );
      }}
    </Formik>
  );
};
export default connect(
  (state) => {
    return {
      officer: state.officersReducer.officer,
      isLoading: state.officersReducer.isLoading,
      message: state.officersReducer.message,
    };
  },
  (dispatch) => {
    return {
      editOfficer: (id, values) => dispatch(editOfficer(id, values)),
      getOneOfficer: (id) => dispatch(getOneOfficer(id)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(OfficerDetailPage);
