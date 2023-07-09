import React from "react";
import userSlice from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTests } from "../../../redux/testSlice";
import { getCourses } from "../../../redux/courseSlice";
import ListTest from "../../../components/Test/ListTest";

const AdminTestPage = () => {
    const dispatch = useDispatch();
    const { setCurrentPage } = userSlice.actions;
    React.useEffect(() => {
        dispatch(setCurrentPage("Quản lý bài kiểm tra"));
    }, [])


    const courses = useSelector((state) => state.course.data);
    const isRefresh = useSelector((state) => state.test.isRefresh);
    const tests = useSelector((state) => state.test.data);
    
    console.log("new tests: ", tests);
    React.useEffect(() => {
        // alert("ok");
        dispatch(getTests());
    }, [isRefresh]);
    
    React.useEffect(() => {
        dispatch(getCourses());
    }, []);
    
    return <>
        <ListTest data={tests} courses={courses} />
    </>;
}

export default AdminTestPage;