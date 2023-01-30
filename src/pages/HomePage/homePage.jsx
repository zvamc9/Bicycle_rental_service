import React from "react";
import css from "./homePage.module.css";
import homeImage from "../../depictions/images/homeImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/Reducers/authorizationReducer";

const HomePage = (props) => {
  const { logOut, isAuthorized } = props;
  const navigate = useNavigate();

  const handleClickButtonLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleClickButtonLogIn = () => {
    navigate("/auth/sign_in");
  };


  return (
    <div className={`wrapper ${css.wrapper}`}>
      <div className={css.text}>
        <h1>
          Ведём учет случаев краж велосипедов.
        </h1>
          <div className={css.help}>
            <h1>Помогаем с поиском.</h1>
          </div>
            <button
              className={`btnBackground ${css.btn}`}
              type="button"
              onClick={
                isAuthorized
                  ? handleClickButtonLogOut
                  : handleClickButtonLogIn
              }
            >
              {isAuthorized ? "Выйти" : "Войти"}
            </button>
       
            <img src={homeImage} className={css.img} alt={"Pretty bicycles"} />
      
            <button className={`btnInform ${css.btnInf}`}
             type="button">
             {isAuthorized ? (
              <Link to="/cases/create_case" className={css.nav_link}>
                Сообщить о краже
              </Link>
            ) : (
              <Link to="/cases/create_case_public" className={css.nav_link}>
                Сообщить о краже
              </Link>
            )} 
               {isAuthorized && (
                 <li className={css.nav_item}>
                  <Link to="/officers" className={css.nav_link}>
                    Ответственные сотрудники
                  </Link>
                </li>
              )}
            </button>
         </div>
      </div>
  );
};
      
export default connect(
  (state) => {
    return {
      isAuthorized: state.authorizationReducer.isAuthorized,
    };
  },
  (dispatch) => {
    return {
      logOut: () => dispatch(logOut()),
    };
  }
)(HomePage);