import Breadcrumb from "../../components/Common/Breadcrumb";
import CourseCard from "../../components/Course/CourseCard";
import coursesData from "../../components/Course/coursesData";

const CoursePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Khóa học"
        description="Tổng hợp các khóa học thịnh hành"
      />
      <div className="relative w-full pl-20 pr-20 pb-40">
        <div className={` w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
          {coursesData.map((course) => (
            <CourseCard
              id={course.id}
              description={course.description}
              title={course.title}
              level={course.level}
              price={course.price}
              duration={course.duration}
              img_url={course.img_url}
            />
          ))}
        </div>


      </div>
    </>
  );
};

export default CoursePage;
