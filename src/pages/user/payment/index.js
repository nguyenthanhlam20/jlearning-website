import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseById } from "../../../redux/courseSlice";
import Invoice from "../../../components/Invoice";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import React from "react";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import SectionTitle from "../../../components/Common/SectionTitle";
import SmoothScrollUp from "../../../components/Common/SmoothScrollUp";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const course_id = params.get('course_id');
    const dispatch = useDispatch();
    const course = useSelector((state) => state.course.specific);

    React.useEffect(() => {
        if (course_id === null || course_id === '') {
            navigate(ROUTE_CONSTANTS.ERROR_PAGE);
        }
    }, [course_id]);


    React.useEffect(() => {
        dispatch(getCourseById({ course_id: course_id }));
    }, [course_id]);


   

    return (
        <>
            <SmoothScrollUp />
            <Breadcrumb
                pageName="Mua khóa học"
                description="Xác nhận mua khóa học"
            />
            <SectionTitle title={"Hóa Đơn"} center paragraph={"Ngày tạo: " + new Date().toLocaleDateString()} mb="70px" />
            <Invoice course={course} />
        </>
    )
}

export default PaymentPage;