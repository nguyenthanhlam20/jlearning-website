import HandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import { SvgIcon } from '@mui/material';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { changePassword } from '../../redux/authenSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../constants/route.constants';
import SmoothScrollUp from '../../components/Common/SmoothScrollUp';


const NewPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const email = useSelector((state) => state.authen.email)

    const handleForgotPassword = () => {
        if (newPassword.trim() === ""
            || confirmNewPassword.trim() === ""
        ) {
            toast.warning('Nhập mật khẩu của bạn!');
            return;
        }

        if(newPassword !== confirmNewPassword) {
            toast.warning('Mật khẩu không trùng khớp');
            return;
        }
        dispatch(changePassword({ email: email, password: newPassword }))
        navigate(ROUTE_CONSTANTS.SIGN_IN);
    };

    return (
        <>
            <SmoothScrollUp />

            <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
                <div className="container">

                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    Thay Đổi Mật Khẩu
                                </h3>
                                <p className="mb-11 text-center text-base font-medium text-body-color">
                                    Nhập mật khẩu cũ và mật khẩu mới của bạn
                                </p>

                                <div>
                                   
                                    <div className="mb-8">
                                        <label
                                            htmlFor="email"
                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                        >
                                            Mật khẩu  mới
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"

                                            placeholder={"Nhập mật khẩu mới"}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        />
                                    </div>
                                    <div className="mb-8">
                                        <label
                                            htmlFor="email"
                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                        >
                                            Xác nhận mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"

                                            placeholder={"Nhập lại mật khẩu mới"}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                        />
                                    </div>


                                    <div className="mb-6">
                                        <button
                                            onClick={handleForgotPassword}
                                            className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">

                                            <SvgIcon sx={{ mr: 2 }} >
                                                <HandThumbUpIcon />
                                            </SvgIcon>
                                            Lưu
                                        </button>
                                    </div>
                                </div>

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

export default NewPasswordPage;
