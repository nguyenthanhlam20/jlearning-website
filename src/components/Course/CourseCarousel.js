import SectionTitle from "../Common/SectionTitle";
import CourseCard from "./CourseCard";
import Carousel from "react-material-ui-carousel";
import React from "react";

const CourseCarousel = ({ data, title,paragraph  }) => {
  const totalCourse = data.length;
  let totalPage = Math.floor(totalCourse / 3);
  let pageList = [];
  if (Math.floor(totalCourse % 3) != 0) totalPage += 1;

  for (let i = 0; i < totalPage; i++) {
    pageList.push(i);

  }

  const [currentPage, setCurrentPage] = React.useState(1);


  const handleAction = () => {

  }
  return (
    <section id="pricing" className="relative z-10 ">
      <div className="container">
        <SectionTitle
          title={title}
          paragraph={paragraph}
          center
          width="665px"
        />

        <div className="relative w-full pl-20 pr-20 pb-20">
          <Carousel
            indicators={totalPage > 1 ? true : false}
            autoPlay={true}
            animation="slide"
            navButtonsAlwaysInvisible
            interval={10000}
            index={currentPage - 1}
            className="h-[670px]"
          >
            {pageList.map((pageNumber) => {

              let startIndex = pageNumber * 3;
              let endIndex = startIndex + 3;
              if (endIndex > totalCourse) endIndex = totalCourse;

              return <div key={"item-" + pageNumber} className={`p-3 w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
                {data.slice(startIndex, endIndex).map((course) => (
                  <CourseCard
                    course={course}
                  />
                ))}
              </div>

            })}
          </Carousel>

          <div className={`${totalPage > 1 ? "block" : "hidden"}`} >
            <button onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              } else {
                setCurrentPage(totalPage);
              }
            }} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">

              <span className="animate-bounce inline-flex bg-primary items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </span>
            </button>
            <button type="button" onClick={() => {
              if (currentPage < totalPage) {
                setCurrentPage(currentPage + 1);
              } else {
                setCurrentPage(1);
              }
            }} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
              <span className="animate-bounce inline-flex bg-primary items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="absolute left-0 bottom-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default CourseCarousel;
