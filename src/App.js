import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/layout";
import HomePage from "./pages/HomePage/homePage";
import Authorization from "./pages/Authorization/authorization";
import Registration from "./pages/Registration/registration";
import ListOfCases from "./pages/ListOfCases/listOfCases";
import CaseForm from "./pages/CaseForm/caseForm";
import CaseFormPublic from "./pages/CaseFormPublic/caseFormPublic";
import DetailPage from "./pages/DetailPage/deatailPage"
import ListOfOfficers from "./pages/ListOfOfficers/listOfOfficers";
import OfficerDetailPage from "./pages/OfficerDetailPage/officerDetailPage";
import { connect } from "react-redux";

function App(props) {
  const { isAuthorized } = props;

  return (
    <div className="wrapperApp">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth/sign_in" element={<Authorization />} />
          <Route path="auth/sign_up" element={<Registration />} />

          {isAuthorized && <Route path="cases" element={<ListOfCases />} />}
          {isAuthorized ? (
            <Route path="cases/create_case" element={<CaseForm />} />
          ) : (
            <Route
              path="cases/create_case_public"
              element={<CaseFormPublic />}
            />
          )}
          {isAuthorized && (
            <Route path="cases/:id" element={<DetailPage />} />
          )}
          {isAuthorized && (
            <Route path="officers" element={<ListOfOfficers />} />
          )}
          {isAuthorized && (
            <Route path="officers/:id" element={<OfficerDetailPage />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default connect((state) => {
  return {
    isAuthorized: state.authorizationReducer.isAuthorized,
  };
})(App);