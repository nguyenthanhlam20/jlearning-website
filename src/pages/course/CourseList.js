import Breadcrumb from "../../components/Common/Breadcrumb";
import CourseCard from "../../components/Course/CourseCard";

const CourseList = ({data}) => {
  return (
    <>
      <Breadcrumb
        pageName="Khóa học"
        description="Tổng hợp các khóa học thịnh hành"
      />
      <div className="relative w-full pl-20 pr-20 pb-40">
        <div className={` w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
          {data.map((course) => (
            <CourseCard
              course={course}
            />
          ))}
        </div>


      </div>
    </>
  );
};

export default CourseList;
