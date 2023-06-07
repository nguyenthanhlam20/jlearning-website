import { Link, useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, SvgIcon, Typography } from "@mui/material";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getLessonsDone } from "../../redux/lessonSlice";
import { getTestsDone } from "../../redux/testSlice";
import React from "react";


function CircularProgressWithLabel(
  props
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


const CourseCard = ({ course }) => {
  const userCourses = useSelector((state) => state.course.userCourses);
  const courseFound = userCourses?.find((c) => c.course_id === course.course_id);
const dispatch = useDispatch();
  const lessonsDone = useSelector((state) => state.lesson.lessons_done);
  const testsDone = useSelector((state) => state.test.tests_done);
  const user = useSelector((state) => state.authen.user);

  React.useEffect(() => {
    dispatch(getLessonsDone({ email: user?.email, course_id: course.course_id }));
    dispatch(getTestsDone({ email: user?.email, course_id: course.course_id }));
  }, [])


  const getTestProgress = () => {
    const totalTest = course?.tests?.length;
    const currentTotalTest = testsDone?.length;

    return currentTotalTest + "/" + totalTest;
  }



  const getLessonProgress = () => {
    let totalLessons = 0;

    const chapters = course?.chapter;
    for (let i = 0; i < chapters.length; i++) {
      totalLessons += chapters[i]?.lessons.length;
    }

    return lessonsDone.length + "/" + totalLessons;
  }


  const getProgress = () => {
    let totalProgress = 0;

    const chapters = course?.chapters;
    for (let i = 0; i < chapters?.length; i++) {
      totalProgress += chapters[i]?.lessons.length;
    }

    if(course?.tests) {
      totalProgress += course?.tests?.length;
    }

    const currentProgress = lessonsDone.length + testsDone.length;

// console.log(course);
    return Math.floor(currentProgress / totalProgress);
  }


  const isBought = ((courseFound !== null && courseFound !== undefined) || course.price === 0) ? true : false;

  const navigate = useNavigate();
  const { price, duration, description, course_name, course_avatar_url, course_id } = course;
  const link = ROUTE_CONSTANTS.COURSE_DETAILS_PAGE + "?course_id=" + course_id;
  const formattedPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleGoToCourse = () => {
    navigate(link);
  }

  const handleBuyCourse = () => {
    if (isBought) {
      navigate(ROUTE_CONSTANTS.LESSON_VIEW_PAGE + "?course_id=" + course.course_id);
    } else {
      navigate(ROUTE_CONSTANTS.PAYMENT + "?course_id=" + course.course_id);
    }
  }

  return (
    <div className="w-full h-full">
      <div
        className="wow h-full fadeInUp relative z-10 rounded-md bg-white px-8 py-10 shadow-signUp dark:bg-[#1D2144]"
        data-wow-delay=".1s"
      >
        <div className="flex mb-5 items-center justify-between">
          <h3 className="price mb-2 text-2xl font-bold text-black dark:text-white">
            {price === 0 ? <span className="text-red-600" >FREE</span> :
              <>
                <span className="amount">{formattedPrice}</span>
                <span className="time text-lg text-body-color"> / {duration} tháng</span>
                <CircularProgressWithLabel value={getProgress()} />
              </>}
          </h3>
          {/* <Link to={link}
            className="mb-2 rounded-3xl text-center p-2  bg-lime  text-xl font-bold text-black dark:text-white">
            N{level}
          </Link> */}
        </div>
        <Link to={link} className="relative block h-[230px] w-full mb-5">
          <img src={course_avatar_url} className="object-fill w-full h-[230px] rounded" alt="image" />
        </Link>
        <h3>
          <Link
            to={link}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {course_name}
          </Link>
        </h3>
        <p className="mb-6 border-b overflow-auto max-h-20 h-20 border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {description}

        </p>
        <div className="mb-1 mt-7 border-b flex row border-body-color border-opacity-10 dark:border-white dark:border-opacity-10">

          {isBought === true ? <>
            <button onClick={() => handleGoToCourse()} className="flex w-full mr-3 bg-cteal items-center justify-center rounded-md p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
              <SvgIcon sx={{ mr: 1 }}>
                <InfoIcon />
              </SvgIcon> Chi tiết
            </button>
            <button onClick={() => handleBuyCourse()} className="flex w-full items-center justify-center rounded-md  bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
              <SvgIcon sx={{ mr: 1 }}>
                <EyeIcon />
              </SvgIcon>   Vào học
            </button>
          </> :

            <>
              <button onClick={() => handleGoToCourse()} className="flex w-full mr-3 bg-cteal items-center justify-center rounded-md p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                <SvgIcon sx={{ mr: 1 }}>
                  <InfoIcon />
                </SvgIcon> Chi tiết
              </button>
              <button
                onClick={() => handleBuyCourse()}
                className="flex w-full items-center justify-center rounded-md  bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                <SvgIcon >
                  <AttachMoneyIcon />
                </SvgIcon>   Mua
              </button></>
          }

        </div>
        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="179"
            height="158"
            viewBox="0 0 179 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
              fill="url(#paint0_linear_70:153)"
            />
            <path
              opacity="0.3"
              d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
              fill="url(#paint1_linear_70:153)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_70:153"
                x1="69.6694"
                y1="29.9033"
                x2="196.108"
                y2="83.2919"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_70:153"
                x1="165.348"
                y1="-75.4466"
                x2="-3.75136"
                y2="103.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
