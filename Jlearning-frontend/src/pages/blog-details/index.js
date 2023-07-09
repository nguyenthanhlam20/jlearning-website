import { Link, useLocation, useNavigate } from "react-router-dom";
import RelatedPost from "../../components/Blog/RelatedPost";
import SharePost from "../../components/Blog/SharePost";
import TagButton from "../../components/Blog/TagButton";
import Breadcrumb from "../../components/Common/Breadcrumb";
import NewsLatterBox from "../../components/Contact/Information";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, getBlogs } from "../../redux/blogSlice";
import React from "react";
import { getBlogCategories } from "../../redux/blogCategorySlice";
import ScrollUp from "../../components/Common/ScrollUp";
import SmoothScrollUp from "../../components/Common/SmoothScrollUp";
import { scrollToTop } from "../../components/ScrollToTop";

const BlogDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const blog_id = params.get('blog_id');

  const categories = useSelector((state) => state.blogCategory.data);
  const blogs = useSelector((state) => state.blog.data);
  const blog = useSelector((state) => state.blog.specific);

  const relatedBlogs = blogs?.filter((b) => (b.blog_category_id === blog?.blog_category_id) && (b.blog_id !== blog.blog_id));

  React.useEffect(() => {
    dispatch(getBlogs());
    dispatch(getBlogCategories());
  }, []);

  React.useEffect(() => {
    if (blog_id === null || blog_id === '') {
      navigate(ROUTE_CONSTANTS.ERROR_PAGE);
    } else {
      dispatch(getBlogById({ blog_id: blog_id }));
    }
    scrollToTop();

  }, [blog_id]);


  return (
    <>
      <Breadcrumb pageName={"Nội dung tin tức"} />
      <section className="overflow-hidden pt-[20px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {blog?.blog_name}
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">

                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            className="fill-current"
                          >
                            <path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z" />
                            <path d="M6.429 8.67529H5.64035C5.49696 8.67529 5.40137 8.77089 5.40137 8.91428V9.67904C5.40137 9.82243 5.49696 9.91802 5.64035 9.91802H6.429C6.57239 9.91802 6.66799 9.82243 6.66799 9.67904V8.91428C6.66799 8.77089 6.5485 8.67529 6.429 8.67529Z" />
                            <path d="M8.93828 8.67529H8.14963C8.00624 8.67529 7.91064 8.77089 7.91064 8.91428V9.67904C7.91064 9.82243 8.00624 9.91802 8.14963 9.91802H8.93828C9.08167 9.91802 9.17727 9.82243 9.17727 9.67904V8.91428C9.17727 8.77089 9.08167 8.67529 8.93828 8.67529Z" />
                            <path d="M11.4715 8.67529H10.6828C10.5394 8.67529 10.4438 8.77089 10.4438 8.91428V9.67904C10.4438 9.82243 10.5394 9.91802 10.6828 9.91802H11.4715C11.6149 9.91802 11.7105 9.82243 11.7105 9.67904V8.91428C11.7105 8.77089 11.591 8.67529 11.4715 8.67529Z" />
                            <path d="M3.89531 11.1606H3.10666C2.96327 11.1606 2.86768 11.2562 2.86768 11.3996V12.1644C2.86768 12.3078 2.96327 12.4034 3.10666 12.4034H3.89531C4.03871 12.4034 4.1343 12.3078 4.1343 12.1644V11.3996C4.1343 11.2562 4.03871 11.1606 3.89531 11.1606Z" />
                            <path d="M6.429 11.1606H5.64035C5.49696 11.1606 5.40137 11.2562 5.40137 11.3996V12.1644C5.40137 12.3078 5.49696 12.4034 5.64035 12.4034H6.429C6.57239 12.4034 6.66799 12.3078 6.66799 12.1644V11.3996C6.66799 11.2562 6.5485 11.1606 6.429 11.1606Z" />
                            <path d="M8.93828 11.1606H8.14963C8.00624 11.1606 7.91064 11.2562 7.91064 11.3996V12.1644C7.91064 12.3078 8.00624 12.4034 8.14963 12.4034H8.93828C9.08167 12.4034 9.17727 12.3078 9.17727 12.1644V11.3996C9.17727 11.2562 9.08167 11.1606 8.93828 11.1606Z" />
                            <path d="M11.4715 11.1606H10.6828C10.5394 11.1606 10.4438 11.2562 10.4438 11.3996V12.1644C10.4438 12.3078 10.5394 12.4034 10.6828 12.4034H11.4715C11.6149 12.4034 11.7105 12.3078 11.7105 12.1644V11.3996C11.7105 11.2562 11.591 11.1606 11.4715 11.1606Z" />
                            <path d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.28906 0C6.54821 0 5.95074 0.597464 5.95074 1.31442C5.95074 1.91189 6.35702 2.41376 6.93058 2.58105V3.3697H1.31442C0.597464 3.3697 0 3.96716 0 4.68412V13.2637C0 13.9807 0.597464 14.5781 1.31442 14.5781H13.2637C13.9807 14.5781 14.5781 13.9807 14.5781 13.2637V4.68412C14.5781 3.96716 13.9807 3.3697 13.2637 3.3697ZM6.6677 1.31442C6.6677 0.979841 6.93058 0.716957 7.28906 0.716957C7.62364 0.716957 7.91042 0.979841 7.91042 1.31442C7.91042 1.649 7.64754 1.91189 7.28906 1.91189C6.95448 1.91189 6.6677 1.6251 6.6677 1.31442ZM1.31442 4.08665H13.2637C13.5983 4.08665 13.8612 4.34954 13.8612 4.68412V6.45261H0.716957V4.68412C0.716957 4.34954 0.979841 4.08665 1.31442 4.08665ZM13.2637 13.8612H1.31442C0.979841 13.8612 0.716957 13.5983 0.716957 13.2637V7.16957H13.8612V13.2637C13.8612 13.5983 13.5983 13.8612 13.2637 13.8612Z" />
                          </svg>
                        </span>
                        {new Date(blog?.created_date).toLocaleDateString()}
                      </p>

                      <p className="flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            className="fill-current"
                          >
                            <path d="M10.2559 3.8125C9.03711 3.8125 8.06836 4.8125 8.06836 6C8.06836 7.1875 9.06836 8.1875 10.2559 8.1875C11.4434 8.1875 12.4434 7.1875 12.4434 6C12.4434 4.8125 11.4746 3.8125 10.2559 3.8125ZM10.2559 7.09375C9.66211 7.09375 9.16211 6.59375 9.16211 6C9.16211 5.40625 9.66211 4.90625 10.2559 4.90625C10.8496 4.90625 11.3496 5.40625 11.3496 6C11.3496 6.59375 10.8496 7.09375 10.2559 7.09375Z" />
                            <path d="M19.7559 5.625C17.6934 2.375 14.1309 0.4375 10.2559 0.4375C6.38086 0.4375 2.81836 2.375 0.755859 5.625C0.630859 5.84375 0.630859 6.125 0.755859 6.34375C2.81836 9.59375 6.38086 11.5312 10.2559 11.5312C14.1309 11.5312 17.6934 9.59375 19.7559 6.34375C19.9121 6.125 19.9121 5.84375 19.7559 5.625ZM10.2559 10.4375C6.84961 10.4375 3.69336 8.78125 1.81836 5.96875C3.69336 3.1875 6.84961 1.53125 10.2559 1.53125C13.6621 1.53125 16.8184 3.1875 18.6934 5.96875C16.8184 8.78125 13.6621 10.4375 10.2559 10.4375Z" />
                          </svg>
                        </span>
                        35
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link to={ROUTE_CONSTANTS.BLOG_PAGE} className="bg-lime text-black text-sm font-medium rounded-full py-2 px-4">

                      {categories?.find((c) => c.blog_category_id === blog.blog_category_id).name}
                    </Link>
                  </div>
                </div>
                <div>

                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative w-full">
                      <img
                        src={blog.blog_avatar_url}
                        alt="image"
                        fill
                        className="h-full w-full  object-center"
                      />
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blog.blog_description}
                  </p>

                  {blog?.blog_details.map((details) => {
                    return (
                      <>
                        <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                          {details.header}
                        </h3>
                        {details.blog_img_url !== '' ? <div className="mb-10 w-full overflow-hidden rounded">
                          <div className="relative  w-full ">
                            <img
                              src={details.blog_img_url}
                              alt="image"
                              fill
                              className="h-full w-full  object-center"
                            />
                          </div>
                        </div> : <></>}

                        <p className="whitespace-pre-wrap mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                          {details.description}
                        </p></>
                    )
                  })}

                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color">
                        Nhóm Tin Tức:
                      </h5>
                      <div className="flex items-center">
                        {categories?.map((c) => {
                          return (
                            <TagButton href={ROUTE_CONSTANTS.BLOG_PAGE + "?blog_category_id=" + c.blog_category_id} text={c.name} />
                          );
                        })}
                      </div>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Chia sẻ tin tức:
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">

              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Tin Tức Liên Quan
                </h3>
                <ul className="p-8 max-h-[330px] overflow-auto">

                  {relatedBlogs?.map((rb) => {
                    return (
                      <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                        <RelatedPost
                          title={rb.blog_name}
                          image={rb.blog_avatar_url}
                          slug={ROUTE_CONSTANTS.BLOG_DETAILS_PAGE + "?blog_id=" + rb.blog_id}
                          date={new Date(rb.created_date).toLocaleDateString()}
                        />
                      </li>
                    );
                  })}


                </ul>
              </div>
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Nhóm Tin Tức
                </h3>
                <ul className="py-6 px-8">
                  {categories?.map((c) => {
                    return (
                      <li>
                        <Link className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary" to={ROUTE_CONSTANTS.BLOG_PAGE + "?blog_category_id=" + c.blog_category_id}>
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}


                </ul>
              </div>


              <NewsLatterBox />
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default BlogDetailsPage;
