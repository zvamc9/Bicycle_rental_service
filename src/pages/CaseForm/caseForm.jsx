import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./caseForm.module.css";
import {
  createCase,
  handleClickMessageButton,
  handleClickModalButton,
} from "../../store/Reducers/casesReducer";
import { getAllOfficers } from "../../store/Reducers/officersReducer";
import MainButton from "../../components/Modal/MainButton";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";

const CaseForm = (props) => {
  const navigate = useNavigate();

  const {
    officers,
    bicycleType,
    getAllOfficers,
    createCase,
    isLoadingCases,
    message,
    handleClickMessageButton,
    caseIsCreated,
    handleClickModalButton,
  } = props;

  useEffect(() => {
    getAllOfficers();
  }, []);

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalSecondaryButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/cases`);
    handleClickModalButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        color: "",
        date: "",
        officer: "",
        description: "",
        agreement: false,
      }}
      validationSchema={Yup.object({
        licenseNumber: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        ownerFullName: Yup.string().required(
          "Это поле обязательно для заполнения"
        ),
        type: Yup.string().required("Это поле обязательно для заполнения"),
        color: Yup.string(),
        date: Yup.date(),
        officer: Yup.string(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед отправкой сообщения"
        ),
      })}
      onSubmit={(values) => {
        createCase(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoadingCases ? (
              <Loading />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className={"wrapper"}>
                    <Form className={`row g-3 ${css.form}`}>
                      <div className="col-md-6">
                        <label htmlFor="licenseNumber" className="form-label">
                          Лицензионный номер
                        </label>
                        <Field
                          type="text"
                          name={"licenseNumber"}
                          className="form-control "
                          placeholder="Лицензионный номер"
                          id="licenseNumber"
                        />
                        <ErrorMessage
                          name={"licenseNumber"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="ownerFullName" className="form-label">
                          ФИО владельца
                        </label>
                        <Field
                          type="text"
                          name={"ownerFullName"}
                          className="form-control "
                          placeholder="ФИО владельца"
                          id="ownerFullName"
                        />
                        <ErrorMessage
                          name={"ownerFullName"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="type" className="form-label">
                          Тип
                        </label>
                        <Field
                          as={"select"}
                          className="form-select"
                          name={"type"}
                          id="type"
                        >
                          <option value="DEFAULT" disabled>
                            Выберите...
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
                        <ErrorMessage
                          name={"type"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="color" className="form-label">
                          Цвет
                        </label>
                        <Field
                          type="text"
                          name={"color"}
                          className="form-control"
                          placeholder="Цвет"
                          id="color"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="date" className="form-label">
                          Дата
                        </label>
                        <Field
                          type="date"
                          name={"date"}
                          className="form-control"
                          id="date"
                        />
                      </div>

                      <div className="col-md-7">
                        <label htmlFor="officer" className="form-label">
                          Сотрудник
                        </label>
                        <Field
                          as={"select"}
                          className="form-select"
                          name={"officer"}
                          id="officer"
                        >
                          <option value="">Выберите...</option>

                          {officers
                            .filter((officer) => officer.approved)
                            .map((officer) => {
                              return (
                                <option key={officer._id} value={officer._id}>
                                  {!officer.firstName || !officer.lastName
                                    ? `Сотрудник ${
                                        !officer.firstName && !officer.lastName
                                          ? officer._id
                                          : officer.firstName ||
                                            officer.lastName
                                      }`
                                    : `${officer.firstName} ${officer.lastName}`}
                                </option>
                              );
                            })}
                        </Field>
                      </div>

                      <div className="col-12">
                        <label htmlFor="description" className="form-label">
                          Описание
                        </label>
                        <Field
                          as={"textarea"}
                          className="form-control"
                          name={"description"}
                          id="description"
                          placeholder="Опишите велосипед"
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <Field
                            className="form-check-input"
                            type={"checkbox"}
                            name={"agreement"}
                            id="agreement"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="agreement"
                          >
                            Согласиться с условиями и правилами
                          </label>
                        </div>
                        <ErrorMessage
                          name={"agreement"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-12">
                        <MainButton
                          title={"Сообщить о краже"}
                          type={"submit"}
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}
            {caseIsCreated && (
              <Modal
                title={"Сообщение о краже создано"}
                paragraph={"Данные успешно отправлены"}
                titleSecondaryButton={"Главная страница"}
                titleMainButton={"Кражи"}
                onClickSecondaryButton={handleCLickModalSecondaryButton}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={true}
              />
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
      bicycleType: state.casesReducer.bicycle.bicycleType,
      isLoadingCases: state.casesReducer.isLoading,
      message: state.casesReducer.message,
      caseIsCreated: state.casesReducer.caseIsCreated,
    };
  },
  (dispatch) => {
    return {
      getAllOfficers: () => dispatch(getAllOfficers()),
      createCase: (values) => dispatch(createCase(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(CaseForm);