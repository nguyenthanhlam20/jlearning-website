
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../../redux/userSlice';
import { getCourses, insertCourse } from '../../../redux/courseSlice';
import AdminCourses from './AdminCourses';

const AdminCoursesPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.data);
  const isRefreshCourse = useSelector(
    (state) => state.course.isRefresh
  );

  const { setCurrentPage } = userSlice.actions;
  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý khóa học"));
  }, [])

  React.useEffect(() => {
    dispatch(getCourses());
  }, [isRefreshCourse])


  return (
    <>

     <AdminCourses courses={courses} />
    </>
  );
};


export default AdminCoursesPage;
