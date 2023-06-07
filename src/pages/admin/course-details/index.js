
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import AdminCourseDetails from "./AdminCourseDetails";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById, getCourses } from "../../../redux/courseSlice";

const AdminCourseDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const course_id = params.get('course_id');
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (course_id === null || course_id === '') {
            navigate(ROUTE_CONSTANTS.ERROR_PAGE);
        }
    }, [course_id]);

    const course = useSelector((state) => state.course.specific);
    // const courses = useSelector((state) => state.course.data);

    // const isExist = courses.find((course) => course.course_id === course_id);
    // if (!isExist) {
    //     navigate(ROUTE_CONSTANTS.ERROR_PAGE);
    // }
    const isRefreshSpecific = useSelector((state) => state.course.isRefreshSpecific);

    React.useEffect(() => {
        dispatch(getCourses());
        dispatch(getCourseById({ course_id: course_id }));
    }, [isRefreshSpecific])
    // console.log(course);

    return <>
        <AdminCourseDetails course={course} />
    </>

}

export default AdminCourseDetailsPage;