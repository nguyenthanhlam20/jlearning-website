import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import SmoothScrollUp from "../../../components/Common/SmoothScrollUp";
import CourseCard from "../../../components/Course/CourseCard";
import coursesData from "../../../components/Course/coursesData";
import React from "react";
import { getUserCourses } from "../../../redux/courseSlice";
import UserCourses from "./UserCourses";

const MyCoursePage = () => {
  const dispatch = useDispatch();
  const userCourses = useSelector((state) => state.course.userCourses);

  return (
    <UserCourses userCourses={userCourses}/>

  );
};

export default MyCoursePage;
