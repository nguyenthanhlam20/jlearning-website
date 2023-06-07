
import React from "react";
import CourseCarousel from "./CourseCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../redux/courseSlice";

const Course = () => {

  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.data);

  React.useEffect(() => {
    dispatch(getCourses());
  }, [])

  return (
    <CourseCarousel
      data={courses}
      title={"CÁC KHÓA HỌC ONLINE TẠI JLEARNING"}
      paragraph={"Có rất nhiều khóa học từ N1-N5 đa dạng và phong phú"}
    />
  )

};

export default Course;
