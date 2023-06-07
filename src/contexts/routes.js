
import { ROUTE_CONSTANTS } from "../constants/route.constants";
import { HomePage } from "../pages";
import SigninPage from "../pages/signin";
import SignupPage from "../pages/signup";
import ForgotPasswordPage from "../pages/forgot-password";
import ErrorPage from "../pages/error";
import BlogPage from "../pages/blog";
import AdminBlogPage from "../pages/admin/blog";
import AdminContactPage from "../pages/admin/contact";
import ContactPage from "../pages/contact";
import SupportPage from "../pages/support";
import AccountPage from "../pages/account";
import AdminCoursesPage from "../pages/admin/courses";
import CoursePage from "../pages/course";
import MyCoursePage from "../pages/user/course/MyCoursePage";
import AdminCourseDetailsPage from "../pages/admin/course-details";
import CourseDetailPage from "../pages/course-details";
import LessonViewPage from "../pages/user/course/LessonViewPage";
import BlogDetailsPage from "../pages/blog-details";
import AdminFeedbackPage from "../pages/admin/feedback";
import AdminSupportPage from "../pages/admin/support";
import SettingPage from "../pages/admin/settings";
import AdminTestPage from "../pages/admin/test";
import AdminTestDetailsPage from "../pages/admin/test-details";
import ChangePasswordPage from "../pages/change-password";
import AdminBlogDetailsPage from "../pages/admin/blog-details";
import PaymentPage from "../pages/user/payment";
import PaymentResultPage from "../pages/user/payment/PaymentResultPage";
import PaymentHistoryPage from "../pages/payment-history";
import AdminInvoicePage from "../pages/admin/invoice";
import NewPasswordPage from "../pages/create-new-password";

export const routes = [
  {
    path: ROUTE_CONSTANTS.HOME_PAGE,
    isPrivate: false,
    component: <HomePage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.NEW_PASSWORD_PAGE,
    isPrivate: false,
    component: <NewPasswordPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CHANGE_PASSWORD_PAGE,
    isPrivate: true,
    component: <ChangePasswordPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.BLOG_DETAILS_PAGE,
    isPrivate: false,
    component: <BlogDetailsPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_TEST_PAGE,
    isPrivate: true,
    component: <AdminTestPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.PAYMENT_HISTORY,
    isPrivate: true,
    component: <PaymentHistoryPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_TEST_DETAILS,
    isPrivate: true,
    component: <AdminTestDetailsPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SETING_PAGE,
    isPrivate: true,
    component: <SettingPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.PAYMENT,
    isPrivate: true,
    component: <PaymentPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_FEEDBACK_PAGE,
    isPrivate: true,
    component: <AdminFeedbackPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_SUPPORT_PAGE,
    isPrivate: true,
    component: <AdminSupportPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.COURSE_PAGE,
    isPrivate: false,
    component: <CoursePage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.COURSE_DETAILS_PAGE,
    isPrivate: true,
    component: <CourseDetailPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.LESSON_VIEW_PAGE,
    isPrivate: true,
    component: <LessonViewPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.MY_COURSE_PAGE,
    isPrivate: true,
    component: <MyCoursePage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ACCOUNT_PAGE,
    isPrivate: true,
    component: <AccountPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.PAYMENT_RESULT_PAGE,
    isPrivate: true,
    component: <PaymentResultPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_INVOICE_PAGE,
    isPrivate: true,
    component: <AdminInvoicePage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.BLOG_PAGE,
    isPrivate: false,
    component: <BlogPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SUPPORT_PAGE,
    isPrivate: false,
    component: <SupportPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_BLOG_PAGE,
    isPrivate: true,
    component: <AdminBlogPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_BLOG_DETAILS_PAGE,
    isPrivate: true,
    component: <AdminBlogDetailsPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_COURSE_DETAILS,
    isPrivate: true,
    component: <AdminCourseDetailsPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_COURSE_PAGE,
    isPrivate: true,
    component: <AdminCoursesPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ADMIN_CONTACT_PAGE,
    isPrivate: true,
    component: <AdminContactPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CONTACT_PAGE,
    isPrivate: false,
    component: <ContactPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SIGN_IN,
    isPrivate: false,
    component: <SigninPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SIGN_UP,
    isPrivate: false,
    component: <SignupPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.FORGOT_PASSOWRD,
    isPrivate: false,
    component: <ForgotPasswordPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ERROR_PAGE,
    isPrivate: false,
    component: <ErrorPage />,
    exact: true,
  },
];
