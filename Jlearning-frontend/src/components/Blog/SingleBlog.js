
import { Card } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import {Link} from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";

const SingleBlog = ({ blog, actionTitle, icon, handleAction, categories }) => {

  const {blog_id, blog_name, blog_avatar_url, blog_description, blog_category_id, created_date } = blog;
  const category = categories.find((c) => c.blog_category_id === blog_category_id);
const link = ROUTE_CONSTANTS.BLOG_DETAILS_PAGE + "?blog_id=" + blog_id;
  return (
    <>
      <Card
     sx={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;"}}
        className=" fadeInUp overflow-hidden rounded-md h-full bg-white  dark:bg-dark"
        data-wow-delay=".1s"
      >
        <Link to={link} className="relative block h-[230px] w-full">

          <img className="w-full h-[230px]" src={blog_avatar_url} alt="avatar" />
        </Link>
        <div className="p-6 h-full  sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3>
            <Link
              to={link}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {blog_name}
            </Link>
          </h3>
          <p className="mb-6 border-b overflow-auto max-h-36 h-36 border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {blog_description}

          </p>
          <div className="flex flex-row items-center justify-between">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              {new Date(created_date).toLocaleDateString()}
            </h4>
            <Link to={link} className="bg-lime text-black text-sm font-medium rounded-full py-2 px-4">
              {category?.name}
            </Link>
          </div>
          <div className="mt-6  w-full ">
            <button onClick={() => handleAction(blog_id)} className=" w-full items-center rounded-md bg-primary p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
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
