import React from "react";
import Dashboard from "../admin/dashboard";
import UserHomePage from "../user/home";
import PublicHomePage from "../public/home";
import { ROLE } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../redux/courseSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authen.user);
  const isRefreshUserCourses = useSelector((state) => state.course.isRefresh);

  React.useEffect(() => {
    if (user !== null) {
      dispatch(getUserCourses({ email: user.email }));
    }
  }, [isRefreshUserCourses])

  return (
    <>
      {user !== null ? user.role_id === ROLE.ADMIN ? <Dashboard /> : <UserHomePage /> : <PublicHomePage />}
    </>
  );
}

export default HomePage;
