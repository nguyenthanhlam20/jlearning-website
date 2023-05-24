
import Blog from "../../../components/Blog";
import ScrollUp from "../../../components/Common/ScrollUp";
import Contact from "../../../components/Contact";
import Course from "../../../components/Course";
import React from "react";
const UserHomePage = () => {
  return <>
    <ScrollUp />
    <div className="mt-4">
      <Course />

      <Course />
      <Blog />
      <Contact />
    </div>
  </>
};

export default UserHomePage;