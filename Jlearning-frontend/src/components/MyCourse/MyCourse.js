
import React from "react";
import CourseCarousel from "../Course/CourseCarousel";
import { useSelector } from "react-redux";

const MyCourse = () => {
    const courses = useSelector((state) => state.course.userCourses);

    return (
        <>
            {courses?.length > 0 ? <CourseCarousel data={courses}

                title={"KHÓA HỌC CỦA BẠN"}
                paragraph={"Danh sách các khóa học của bạn"}
            /> : <></>}
            </>
    )

};

export default MyCourse;
