import { useDispatch, useSelector } from "react-redux";
import React from "react";
import UserCourses from "./UserCourses";

const MyCoursePage = () => {
  const userCourses = useSelector((state) => state.course.userCourses);

  return (
    <UserCourses userCourses={userCourses}/>

  );
};

export default MyCoursePage;
