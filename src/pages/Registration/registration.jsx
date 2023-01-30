import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./registration.module.css";
import {
  handleClickMessageButton,
  signUp,
} from "../../store/Reducers/authorizationReducer";
import { connect } from "react-redux";
import {
  getAllOfficers,
  handleClickModalButton,
} from "../../store/Reducers/officersReducer";
import MainButton from "../../components/Modal/MainButton";
import Loading from "../../components/Loading/loading";
import Message from "../../components/Message/message";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";

const Registration = (props) => {
  const navigate = useNavigate();

  const {
    signUp,
    createOfficer,
    isLoading,
    isRegistered,
    messageAuthorization,
    messageOfficers,
    handleClickMessageButton,
    handleClickModalButton,
    officerIsCreated,
  } = props;

  const handleClickMessage = () => {
    navigate(`/auth/sign_in`);
    handleClickMessageButton();
  };
  const handleCLickModalSecondaryButton = () => {
    navigate(`/`);
    handleClickModalButton();
  };

  const handleCLickModalMainButton = () => {
    navigate(`/auth/sign_in`);
    handleClickModalButton();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        clientId: "",
        firstName: "",
        lastName: "",
        approved: false,
        agreement: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Пожалуйста введите верный e-mail адрес")
          .required("Это поле обязательно для заполнения"),
        password: Yup.string()
          .min(3, "Пароль должен содержать менее 12 символов")
          .max(12, "Пароль должен содержать менее 12 символов")
          .required("Это поле обязательно для заполнения"),
        clientId: Yup.string().required("Это поле обязательно для заполнения"),
        firstName: Yup.string().max(
          15,
          "Это поле может содержать менее 15 символов"
        ),
        lastName: Yup.string().max(
          20,
          "Это поле может содержать менее 20 символов"
        ),
        agreement: Yup.boolean().oneOf(
          [true],
          "Вы должны согласиться перед регистрацией"
        ),
      })}
      onSubmit={(values) => {
        signUp(values);
        createOfficer(values);
      }}
    >
      {(formik) => {
        return (
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {messageAuthorization || messageOfficers ? (
                  <Message
                    message={messageAuthorization || messageOfficers}
                    onClick={handleClickMessage}
                  />
                ) : (
                  <div className="wrapper">
                    <Form className={`row g-3 needs-validation ${css.form}`}>
                      <div className="col-md-4">
                        <label className={css.form_label} htmlFor="email">
                          E-mail:
                        </label>
                        <Field
                          type="email"
                          className={css.form_control}
                          id="email"
                          name={"email"}
                          placeholder="name@example.com"
                        />
                        <ErrorMessage
                          name={"email"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="password" className={css.form_label}>
                          Пароль:
                        </label>
                        <Field
                          type="password"
                          className={css.form_control}
                          id="password"
                          name={"password"}
                          placeholder="Пароль"
                          autoComplete="on"
                        />
                        <ErrorMessage
                          name={"password"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="clientId" className={css.form_label}>
                          ID:
                        </label>
                        <Field
                          type="text"
                          className={css.form_control}
                          id="clientId"
                          name={"clientId"}
                          placeholder="ID клиента"
                        />
                        <ErrorMessage
                          name={"clientId"}
                          className="invalidMessage"
                          component="div"
                        />
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="firstName" className={css.form_label}>
                          Имя:
                        </label>
                        <Field
                          type="text"
                          className={css.form_control}
                          id="firstName"
                          name={"firstName"}
                          placeholder="Имя"
                        />
                      </div>

                      <div className="col-md-5">
                        <label htmlFor="lastName" className={css.form_label}>
                          Фамилия:
                        </label>
                        <Field
                          type="text"
                          className={css.form_control}
                          id="lastName"
                          name={"lastName"}
                          placeholder="Фамилия"
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="approved" className={css.form_label}>
                          Одобрен:
                        </label>
                        <Field
                          as={"select"}
                          className={css.form_select}
                          id="approved"
                          name={"approved"}
                          disabled
                        >
                          <option value={"false"}>Не одобрен</option>
                        </Field>
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
                            className={css.form_check_label}
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
                          className ={css.btnInform}
                          title={"Зарегистрироваться"}
                          type={"submit"}
                          disabled={!(formik.isValid && formik.dirty)}
                        />
                      </div>
                    </Form>
                  </div>
                )}
              </>
            )}

            {officerIsCreated && isRegistered && (
              <Modal
                title={"Пользователь создан"}
                paragraph={"Регистрация успешно пройдена"}
                titleSecondaryButton={"Главная страница"}
                titleMainButton={"Войти"}
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
      messageAuthorization: state.authorizationReducer.message,
      messageOfficers: state.officersReducer.message,
      isLoading: state.authorizationReducer.isLoading,
      isRegistered: state.authorizationReducer.isRegistered,
      officerIsCreated: state.officersReducer.officerIsCreated,
    };
  },
  (dispatch) => {
    return {
      signUp: (values) => dispatch(signUp(values)),
      getAllOfficers: () => dispatch(getAllOfficers()),
      handleClickMessageButton: () => dispatch(handleClickMessageButton()),
      handleClickModalButton: () => dispatch(handleClickModalButton()),
    };
  }
)(Registration);