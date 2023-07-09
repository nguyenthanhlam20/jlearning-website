import { useLocation, useNavigate } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getCourseById, getCourses } from "../../redux/courseSlice";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import { toast } from "react-toastify";

const CourseDetailPage = () => {
    const user = useSelector((state) => state.authen.user);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const course_id = params.get('course_id');
    const dispatch = useDispatch();

    const course = useSelector((state) => state.course.specific);

    React.useEffect(() => {
        dispatch(getCourseById({ course_id: course_id }));
    }, [])

    // let flag = false;


    // React.useState(() => {
    //     flag = false;
    // }, [course])

    // React.useEffect(() => {
    //     if (course.price !== 0 && (user === null || user === undefined) && flag === false) {
    //         toast.warning("Đăng nhập để xem khóa học");
    //         navigate(ROUTE_CONSTANTS.SIGN_IN);
    //         flag = true;
    //     }
    // }, [])

    return <>
        <CourseDetails course={course} />
    </>
}

export default CourseDetailPage;