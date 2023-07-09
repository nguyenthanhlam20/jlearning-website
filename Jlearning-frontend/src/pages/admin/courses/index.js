
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../../redux/userSlice';
import { getCourses } from '../../../redux/courseSlice';
import ListCourse from "../../../components/Course/ListCourse";

const AdminCoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.data);
  const isRefreshCourse = useSelector(
    (state) => state.course.isRefresh
  );

  const { setCurrentPage } = userSlice.actions;

  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý khóa học"));
  }, [dispatch, setCurrentPage])

  React.useEffect(() => {
    dispatch(getCourses());
  }, [dispatch, isRefreshCourse])


  return (
    <>

      <ListCourse data={courses} />
    </>
  );
};


export default AdminCoursesPage;
