import Breadcrumb from "../../../components/Common/Breadcrumb";
import SmoothScrollUp from "../../../components/Common/SmoothScrollUp";
import CourseCard from "../../../components/Course/CourseCard";
import React from "react";

const UserCourses = ({ userCourses }) => {

    return (
        <>
            <SmoothScrollUp />

            <Breadcrumb
                pageName="Khóa học của tôi"
                description="Các khóa học của bạn"
            />
            <div className="relative w-full pl-20 pr-20 pb-40">
                <div className={` w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
                    {userCourses && userCourses?.map((course, key) => (
                        <CourseCard
                        key={"course-card-" + key}
                            course={course}
                           
                        />))}
                </div>


            </div>
        </>
    );
};

export default UserCourses;
