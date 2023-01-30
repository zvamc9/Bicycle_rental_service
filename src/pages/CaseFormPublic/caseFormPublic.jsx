import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import css from "./caseFormPublic.module.css";
import {
  createCasePublic,
  handleClickMessageButton,
  handleClickModalButton,
} from "../../store/Reducers/casesReducer";
import MainButton from "../../components/Modal/MainButton";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";
import Modal from "../../components/Modal/modal";

const CaseFormPublic = (props) => {
  const {
    createCasePublic,
    bicycleType,
    isLoading,
    message,
    handleClickMessageButton,
    caseIsCreated,
    handleClickModalButton,
  } = props;

  const navigate = useNavigate();

  const handleClickMessage = () => {
    navigate(`/`);
    handleClickMessageButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        clientId: "",
        color: "",
        date: "",
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
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        color: Yup.string(),
        date: Yup.date(),
        description: Yup.string(),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед отправкой сообщения"
        ),
      })}
      onSubmit={(values) => {
        createCasePublic(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {message ? (
                  <Message message={message} onClick={handleClickMessage} />
                ) : (
                  <div className={`row g-3 ${css.form}`}>
                    <Form className={`row g-3 ${css.form}`}>
                      <div className="col-md-6">
                        <label htmlFor="licenseNumber" className={css.form_label}>
                          Лицензионный номер:
                        </label>
                        <Field
                          type="text"
                          name={"licenseNumber"}
                          className={css.form_control} 
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
                        <label htmlFor="ownerFullName" className={css.form_label}>
                          ФИО владельца:
                        </label>
                        <Field
                          type="text"
                          name={"ownerFullName"}
                          className={css.form_control}
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
                        <label htmlFor="type" className={css.form_label}>
                          Тип:
                        </label>
                        <Field
                          as={"select"}
                          className={css.form_select}
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

                      <div className="col-md-8">
                        <label htmlFor="clientId" className={css.form_label}>
                          ID клиента:
                        </label>
                        <Field
                          type="text"
                          name={"clientId"}
                          className={css.form_control}
                          placeholder="ID клиента"
                          id="clientId"
                        />
                        <ErrorMessage
                          name={"clientId"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="color" className={css.form_label}>
                          Цвет:
                        </label>
                        <Field
                          type="text"
                          name={"color"}
                          className={css.form_control}
                          placeholder="Цвет"
                          id="color"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="date" className={css.form_label}>
                          Дата:
                        </label>
                        <Field
                          type="date"
                          name={"date"}
                          className={css.form_control}
                          id="date"
                        />
                      </div>

                      <div className={css.col_12}>
                        <label htmlFor="description" className={css.form_label_description}>
                          Описание:
                        </label>
                        <Field
                          as={"textarea"}
                          className={css.form_description}
                          name={"description"}
                          id="description"
                          placeholder="Опишите велосипед"
                        />
                      </div>

                      <div className="col-12">
                        <div className={css.form_check}>
                          <Field
                            className={css.form_check_input}
                            type={"checkbox"}
                            name={"agreement"}
                            id="agreement"
                          />
                          <label
                            className="form_check_label"
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
                          className ={css.inform}
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
                titleMainButton={"Главная страница"}
                onClickMainButton={handleCLickModalMainButton}
                isSecondaryButtonShown={false}
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
      createCasePublic: (values) => dispatch(createCasePublic(values)),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(CaseFormPublic);