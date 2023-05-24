
import Blog from "../../../components/Blog";
import ScrollUp from "../../../components/Common/ScrollUp";
import Contact from "../../../components/Contact";
import Features from "../../../components/Features";
import Hero from "../../../components/Hero";
import Course from "../../../components/Course";
import Testimonials from "../../../components/Testimonials";
import Video from "../../../components/Video";
import React from "react";
const PublicHomePage = () => {
  return <>
    <ScrollUp />
    <Hero />
    <Features />
    <Video />
    <Course />
    <Blog />
    <Testimonials />
    <Contact />
  </>
};

export default PublicHomePage;