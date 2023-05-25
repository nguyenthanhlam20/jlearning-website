import Carousel from "react-material-ui-carousel";
import React, { useRef } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
const Blog = () => {

  const totalBlog = blogData.length;
  let totalPage = Math.floor(totalBlog / 3);
  let pageList = [];
  if (Math.floor(totalBlog % 3) != 0) totalPage += 1;

  for (let i = 0; i < totalPage; i++) {
    pageList.push(i);

  }

  const [currentPage, setCurrentPage] = React.useState(1);


  const handleAction = () => {

  }
  return (
    <section id="blog" className="bg-primary/5 py-16 md:py-20 lg:py-28 h-full">
      <div className="container">
        <SectionTitle
          title="Tin Tức"
          paragraph="Chia sẻ kinh nghiệm học tập, văn hóa Nhật Bản"
          center
        />
        <div className="relative  w-full pl-20 pr-20" >
          <Carousel
            indicators={totalPage > 1 ? true : false}
            autoPlay={true}
            animation="slide"
            navButtonsAlwaysInvisible
            interval={7000}
            index={currentPage - 1}
            className="h-[700px]"
          >
            {pageList.map((pageNumber) => {

              let startIndex = pageNumber * 3;
              let endIndex = startIndex + 3;
              if (endIndex > totalBlog) endIndex = totalBlog;

              return <div

                key={"item-" + pageNumber} className={` w-full h-full duration-700 ease-in-out grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3 `}>
                {blogData.slice(startIndex, endIndex).map((blog) => (
                  <div key={"blog-" + blog.id} id={pageNumber} className="w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
                    <SingleBlog actionTitle={"Xem chi tiết"} icon={<EyeIcon />} handleAction={handleAction} blog={blog} />
                  </div>
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
                <span className="sr-only">Previous</span>
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
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
