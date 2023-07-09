import { useLocation, useNavigate } from "react-router-dom";
import AdminTestDetails from "./AdminTestDetails";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";
import { getTestById } from "../../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getCourses } from "../../../redux/courseSlice";

const AdminTestDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const test_id = params.get('test_id');
    React.useEffect(() => {
        if (test_id === null || test_id === '') {
            navigate(ROUTE_CONSTANTS.ERROR_PAGE);
        }
    }, [test_id]);

    const test = useSelector((state) => state.test.specific);

    const isRefreshSpecific = useSelector((state) => state.test.isRefreshSpecific);


    const courses = useSelector((state) => state.course.data);

    React.useEffect(() => {
        dispatch(getTestById({test_id: test_id}));
    }, [isRefreshSpecific])

    React.useEffect(() => {
        dispatch(getCourses());
    }, [])


   console.log(test);

    return <>
        <AdminTestDetails test={test} courses={courses} />
    </>;
}

export default AdminTestDetailsPage;