import React from "react";
import Dashboard from "../admin/dashboard";
import UserHomePage from "../user/home";
import PublicHomePage from "../public/home";
import { ROLE } from "../../constants/constants";
import { useSelector } from "react-redux";


const HomePage = () => {
  const user = useSelector((state) => state.authen.user);

  return (
    <>
      {user != null ? user.role_id === ROLE.ADMIN ? <Dashboard /> : <UserHomePage /> : <PublicHomePage />}
    </>
  );
}

export default HomePage;
