import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import css from "./detailPage.module.css";
//import bicycle from "../../assets/icons/bicycleIcon.svg";
import { getAllOfficers } from "../../store/Reducers/officersReducer";
import {
  editCase,
  getOneCase,
  handleClickMessageButton,
} from "../../store/Reducers/casesReducer";
import SecondaryButton from "../../components/SecondaryButton";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";

const CaseDetailPage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    officers,
    getAllOfficers,
    editCase,
    bicycleType,
    caseStatus,
    getOneCase,
    someCase,
    isLoading,
    message,
    handleClickMessageButton,
  } = props;

  const [isClickedStatus, setIsClickedStatus] = useState(false);
  const [isClickedLicenseNumber, setIsClickedLicenseNumber] = useState(false);
  const [isClickedOwnerFullName, setIsClickedOwnerFullName] = useState(false);
  const [isClickedType, setIsClickedType] = useState(false);
  const [isClickedColor, setIsClickedColor] = useState(false);
  const [isClickedOfficer, setIsClickedOfficer] = useState(false);
  const [isClickedDescription, setIsClickedDescription] = useState(false);
  const [isClickedResolution, setIsClickedResolution] = useState(false);

  const handleClickStatus = () => {
    setIsClickedStatus((prevState) => !prevState);
  };
  const handleClickLicenseNumber = () => {
    setIsClickedLicenseNumber((prevState) => !prevState);
  };
  const handleClickOwnerFullName = () => {
    setIsClickedOwnerFullName((prevState) => !prevState);
  };
  const handleClickType = () => {
    setIsClickedType((prevState) => !prevState);
  };
  const handleClickColor = () => {
    setIsClickedColor((prevState) => !prevState);
  };
  const handleClickOfficer = () => {
    setIsClickedOfficer((prevState) => !prevState);
  };
  const handleClickDescription = () => {
    setIsClickedDescription((prevState) => !prevState);
  };
  const handleClickResolution = () => {
    setIsClickedResolution((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.which === 13 || e.keyCode === 13) {
      setIsClickedLicenseNumber(false);
      setIsClickedOwnerFullName(false);
      setIsClickedColor(false);
      setIsClickedDescription(false);
      setIsClickedResolution(false);
    }
  };

  useEffect(() => {
    getOneCase(id);
  }, [dispatch, getOneCase, id]);

  useEffect(() => {
    getAllOfficers();
  }, [getAllOfficers]);

  const handleClickMessage = () => {
    navigate(`/cases`);
    handleClickMessageButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        status: someCase.status || "",
        licenseNumber: someCase.licenseNumber || "",
        ownerFullName: someCase.ownerFullName || "",
        type: someCase.type || "",
        color: someCase.color || "",
        officer: someCase.officer || "",
        description: someCase.description || "",
        resolution: someCase.resolution || "",
      }}
      validationSchema={Yup.object({
        status: Yup.string(),
        licenseNumber: Yup.string().required(
          "?????? ???????? ?????????????????????? ?????? ????????????????????"
        ),
        ownerFullName: Yup.string().required(
          "?????? ???????? ?????????????????????? ?????? ????????????????????"
        ),
        type: Yup.string().nullable(),
        color: Yup.string().nullable(),
        officer: Yup.string().nullable(),
        description: Yup.string().nullable(),
        resolution: Yup.string()
          .nullable()
          .when("status", {
            is: (value) => value === "done",
            then: Yup.string()
              .nullable()
              .required("?????? ???????? ?????????????????????? ?????? ????????????????????"),
          }),
      })}
      onSubmit={(values) => {
        editCase(someCase._id, values);
        setIsClickedStatus(false);
        setIsClickedLicenseNumber(false);
        setIsClickedOwnerFullName(false);
        setIsClickedColor(false);
        setIsClickedType(false);
        setIsClickedOfficer(false);
        setIsClickedDescription(false);
        setIsClickedResolution(false);
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
                    <Form className={css.form}>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th colSpan="2" className={css.thTextAlign}>
                              <p className={css.p}>
                                ?????????????????? ???????? ??????????????{" "}
                                {new Date(
                                  someCase.createdAt
                                ).toLocaleDateString()}{" "}
                                ??{" "}
                                {new Date(
                                  someCase.createdAt
                                ).toLocaleTimeString()}
                              </p>

                              {someCase && (
                                <p className={css.p}>
                                  {!someCase.updatedAt
                                    ? "?????????????????? ???? ??????????????????????????????"
                                    : `?????????????????? ???????? ?????????????????????????????? ${new Date(
                                        someCase.updatedAt
                                      ).toLocaleDateString()} ?? ${new Date(
                                        someCase.updatedAt
                                      ).toLocaleTimeString()}`}
                                </p>
                              )}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr onClick={handleClickStatus} className={"cursor"}>
                            <td className={css.cell1}>????????????</td>

                            <td className={css.cell2}>
                              {!isClickedStatus ? (
                                (values.status === "new" && "??????????????") ||
                                (values.status === "in_progress" &&
                                  "?? ????????????????") ||
                                (values.status === "done" && "??????????????????")
                              ) : (
                                <Field
                                  as="select"
                                  className="form-select"
                                  name="status"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="DEFAULT" disabled>
                                    ????????????????...
                                  </option>
                                  {caseStatus &&
                                    caseStatus.map((item, index) => {
                                      return (
                                        <option value={item.value} key={index}>
                                          {item.title}
                                        </option>
                                      );
                                    })}
                                </Field>
                              )}
                            </td>
                          </tr>

                          {values.status === "done" && (
                            <tr
                              onClick={handleClickResolution}
                              className={"cursor"}
                            >
                              <td className={css.cell1}>??????????????</td>

                              <td className={css.cell2}>
                                {!isClickedResolution &&
                                someCase &&
                                !someCase.resolution ? (
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    name={"resolution"}
                                    placeholder="?????????????? ?????? ?????? ?????????? ????????????"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  values.resolution
                                )}
                                <ErrorMessage
                                  name={"resolution"}
                                  component="div"
                                  className="invalidMessage"
                                />
                              </td>
                            </tr>
                          )}

                          <tr
                            onClick={handleClickLicenseNumber}
                            className={"cursor"}
                          >
                            <td className={css.cell1}>???????????????????????? ??????????</td>

                            <td className={css.cell2}>
                              {!isClickedLicenseNumber ? (
                                values.licenseNumber
                              ) : (
                                <Field
                                  type="text"
                                  name={"licenseNumber"}
                                  className="form-control"
                                  placeholder={"?????????????? ???????????????????????? ??????????"}
                                  onKeyPress={handleKeyPress}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name={"licenseNumber"}
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr
                            onClick={handleClickOwnerFullName}
                            className={"cursor"}
                          >
                            <td className={css.cell1}>?????? ??????????????????</td>

                            <td className={css.cell2}>
                              {!isClickedOwnerFullName ? (
                                values.ownerFullName
                              ) : (
                                <Field
                                  type="text"
                                  name={"ownerFullName"}
                                  className="form-control"
                                  placeholder={"?????????????? ?????? ??????????????????"}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                              <ErrorMessage
                                name={"ownerFullName"}
                                component="div"
                                className="invalidMessage"
                              />
                            </td>
                          </tr>

                          <tr onClick={handleClickType} className={"cursor"}>
                            <td className={css.cell1}>??????</td>

                            <td className={css.cell2}>
                              {!isClickedType ? (
                                (values.type === "general" && "??????????????") ||
                                (values.type === "sport" && "????????????????????")
                              ) : (
                                <Field
                                  as="select"
                                  className="form-select"
                                  name="type"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="DEFAULT" disabled>
                                    ????????????????...
                                  </option>
                                  {bicycleType &&
                                    bicycleType.map((item, index) => {
                                      return (
                                        <option value={item.value} key={index}>
                                          {item.title}
                                        </option>
                                      );
                                    })}
                                </Field>
                              )}
                            </td>
                          </tr>

                          <tr onClick={handleClickColor} className={"cursor"}>
                            <td className={css.cell1}>????????</td>

                            <td className={css.cell2}>
                              {!isClickedColor ? (
                                values.color
                              ) : (
                                <Field
                                  type="text"
                                  name={"color"}
                                  className="form-control"
                                  placeholder={"???????????????? ???????? ????????????????????"}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                            </td>
                          </tr>

                          <tr onClick={handleClickOfficer} className={"cursor"}>
                            <td className={css.cell1}>??????????????????</td>

                            <td className={css.cell2}>
                              {!isClickedOfficer ? (
                                officers.find(
                                  (officer) => officer._id === values.officer
                                ) &&
                                `${
                                  !officers.find(
                                    (officer) => officer._id === values.officer
                                  ).firstName
                                    ? "??????????????????"
                                    : officers.find(
                                        (officer) =>
                                          officer._id === values.officer
                                      ).firstName
                                } ${
                                  !officers.find(
                                    (officer) => officer._id === values.officer
                                  ).lastName
                                    ? officers.find(
                                        (officer) =>
                                          officer._id === values.officer
                                      )._id
                                    : officers.find(
                                        (officer) =>
                                          officer._id === values.officer
                                      ).lastName
                                }`
                              ) : (
                                <Field
                                  as="select"
                                  className="form-select"
                                  name="officer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="">????????????????...</option>
                                  {officers
                                    .filter((officer) => officer.approved)
                                    .map((officer) => {
                                      return (
                                        <option
                                          key={officer._id}
                                          value={officer._id}
                                        >
                                          {!officer.firstName ||
                                          !officer.lastName
                                            ? `?????????????????? ${officer._id}`
                                            : `${officer.firstName} ${officer.lastName}`}
                                        </option>
                                      );
                                    })}
                                </Field>
                              )}
                            </td>
                          </tr>

                          <tr
                            onClick={handleClickDescription}
                            className={"cursor"}
                          >
                            <td className={css.cell1}>????????????????</td>

                            <td className={css.cell2}>
                              {!isClickedDescription ? (
                                values.description
                              ) : (
                                <Field
                                  as="textarea"
                                  className="form-control"
                                  name={"description"}
                                  placeholder="?????????????? ????????????"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className={css.btnWrapper}>
                        <SecondaryButton
                          title={"?????????????????? ??????????????????"}
                          type="submit"
                          className={css.btnSave}
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
      officers: state.officersReducer.officers,
      someCase: state.casesReducer.case,
      caseStatus: state.casesReducer.bicycle.caseStatus,
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoading: state.casesReducer.isLoading,
      message: state.casesReducer.message,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      getOneCase: (id) => dispatch(getOneCase(id)),
      editCase: (id, values) => dispatch(editCase(id, values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
    };
  }
)(CaseDetailPage);
