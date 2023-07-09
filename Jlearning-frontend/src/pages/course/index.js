
import { useDispatch, useSelector } from "react-redux";
import CourseList from "./CourseList";
import React from "react";
import { getCourses } from "../../redux/courseSlice";
import SmoothScrollUp from "../../components/Common/SmoothScrollUp";

const CoursePage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.data);

  React.useEffect(() => {
    dispatch(getCourses());
  }, [])

  return (
    <>
        <SmoothScrollUp />

      <CourseList data={courses} />
    </>
  );
};

export default CoursePage;
