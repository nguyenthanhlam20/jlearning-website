
import { Card } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import {Link} from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";

const SingleBlog = ({ blog, actionTitle, icon, handleAction }) => {
  const {id, title, image, paragraph, tags, category, publishDate } = blog;
  return (
    <>
      <Card
     sx={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;"}}
        className=" fadeInUp overflow-hidden rounded-md h-full bg-white  dark:bg-dark"
        data-wow-delay=".1s"
      >
        <Link to={ROUTE_CONSTANTS.BLOG_DETAILS_PAGE} className="relative block h-[230px] w-full">

          <img className="w-full h-[230px]" src={image} alt="image" />
        </Link>
        <div className="p-6 h-full  sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
              to={ROUTE_CONSTANTS.BLOG_DETAILS_PAGE}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b overflow-auto max-h-36 h-36 border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {paragraph}

          </p>
          <div className="flex flex-row items-center justify-between">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              {publishDate}
            </h4>
            <Link to={ROUTE_CONSTANTS.BLOG_PAGE} className="bg-lime text-black text-sm font-medium rounded-full py-2 px-4">
              {category}
            </Link>
          </div>
          <div className="mt-6  w-full ">
            <button onClick={() => handleAction(id)} className=" w-full items-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
              <SvgIcon className="mr-3" >
                {icon}
              </SvgIcon>{actionTitle}
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SingleBlog;
