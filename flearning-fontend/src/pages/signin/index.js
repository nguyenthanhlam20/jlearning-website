
import { APP_CONSTANTS, SIGNIN_CONSTANTS, SIGNUP_CONSTANTS } from "../../constants/constants";
import { ROUTE_CONSTANTS } from "../../constants/route.constants";
import authenSlice, { signin } from "../../redux/authenSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { Link, useNavigate } from "react-router-dom";


const SigninPage = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRemember, setIsRemember] = React.useState(false);
  const user = useSelector((state) => state.authen.user);
  const { signOut } = authenSlice.actions;

  if(user != null ) {
    navigate(ROUTE_CONSTANTS.HOME_PAGE);
  }

  const handleSignIn = () => {
    if(email == "" || password == "") {
      toast.warning('Nhập tài khoản và mật khẩu của bạn!');
    } else {
      dispatch(signin({ email: email, password: password, isRemember: isRemember }));
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    // TODO: Create new user account using the response.profileObj data
  }

  const onFailure = (error) => {
    if (error.error === "popup_closed_by_user") {
      // toast.warning('Đăng nhập bằng Google bị hủy');
    } else {
      // toast.error('Không thể đăng nhập bằng Google');
    }
   
    console.log(error);
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
       
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {SIGNIN_CONSTANTS.SIGN_IN_TITLE}
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
               {SIGNIN_CONSTANTS.SIGN_IN_MESSAGE}
                </p>
                <div className="mb-6 flex w-full items-center justify-center">
                 <GoogleLogin
                  clientId={APP_CONSTANTS.GOOGLE_CLIENT_ID}
                  buttonText="Đăng nhập bằng Google"
                  onSuccess={responseGoogle}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                />
                </div>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                  <p className="w-full px-4 text-center text-base font-medium text-body-color">
                   {SIGNIN_CONSTANTS.OR}
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[50px] bg-body-color sm:block"></span>
                </div>
                <div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                     {APP_CONSTANTS.EMAIL}
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder={SIGNIN_CONSTANTS.SIGN_IN_EMAIL}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {APP_CONSTANTS.PASSWORD}
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder={SIGNIN_CONSTANTS.SIGN_IN_PASSWORD}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                            onChange={() => setIsRemember(!isRemember)}
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        {SIGNIN_CONSTANTS.REMEMBER_ME}
                      </label>
                    </div>
                    <div>
                      <Link
                        to={ROUTE_CONSTANTS.FORGOT_PASSOWRD}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {SIGNIN_CONSTANTS.FORGOT_PASSOWRD}
                      </Link>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button
                    onClick={handleSignIn}
                    className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      {SIGNIN_CONSTANTS.SIGN_IN_TITLE}
                    </button>
                  </div>
                </div>
                <p className="text-center text-base font-medium  text-body-color">
                  {SIGNIN_CONSTANTS.DONT_HAVE_ACCOUNT} 
                  <Link to={ROUTE_CONSTANTS.SIGN_UP} className="ml-1 text-primary hover:underline">
                    {SIGNUP_CONSTANTS.SIGN_UP_TITLE}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
