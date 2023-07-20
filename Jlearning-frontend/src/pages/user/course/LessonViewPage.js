import { useLocation, useNavigate } from "react-router-dom";
import LessonDetails from "./LessonDetails";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getCourseById } from "../../../redux/courseSlice";
import { getLessonsDone } from "../../../redux/lessonSlice";
import { getTestsDone } from "../../../redux/testSlice";
import SmoothScrollUp from "../../../components/Common/SmoothScrollUp";
import { getFeedbackById } from "../../../redux/feedbackSlice";

const LessonViewPage = () => {
    const user = useSelector((state) => state.authen.user);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const course_id = params.get('course_id');
    const dispatch = useDispatch();

   

    return (
        <>
            <SmoothScrollUp />
            <LessonDetails course_id={course_id} user={user}  />
        </>
    )
};

export default LessonViewPage;