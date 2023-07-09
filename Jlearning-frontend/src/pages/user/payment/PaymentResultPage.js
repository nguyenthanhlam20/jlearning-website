import { useLocation, useNavigate } from "react-router-dom";
import PaymentFailed from "./PaymentFailed"
import { useDispatch, useSelector } from "react-redux";
import PaymentSuccess from "./PaymentSuccess";
import paymentSlice, { insertPayment } from "../../../redux/paymentSlice";
import React from "react";
import courseSlice, { insertUserCourse } from "../../../redux/courseSlice";
import { ROUTE_CONSTANTS } from "../../../constants/route.constants";

const PaymentResultPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get('vnp_TransactionStatus');
    const [paymentStatus, setPaymentStatus] = React.useState((2 === parseInt(status) ? false : true));

    const { resetPayment } = paymentSlice.actions;
    const { setIsRefresh } = courseSlice.actions;
    const payment = useSelector((state) => state.payment.data);

    let flag = paymentStatus;
    React.useEffect(() => {
        if (flag === true && payment !== null) {
            if (paymentStatus === true) {
                dispatch(insertPayment(payment));
                dispatch(insertUserCourse({ email: payment.email, course_id: payment.course_id, enrolled_date: payment.created_date }));
                dispatch(setIsRefresh());
                flag = false;
            }
            dispatch(resetPayment());
        }
    }, []);
    return (

        <> {paymentStatus === false ? <PaymentFailed /> : <PaymentSuccess />}</>
    )
}

export default PaymentResultPage;