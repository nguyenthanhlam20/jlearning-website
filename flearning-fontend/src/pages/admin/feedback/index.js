import React from "react";
import userSlice from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbacks } from "../../../redux/feedbackSlice";
import ListFeedback from "../../../components/Feedback/ListFeedback";

const AdminFeedbackPage = () => {
    const dispatch = useDispatch();
    const { setCurrentPage } = userSlice.actions;
    React.useEffect(() => {
        dispatch(setCurrentPage("Quản lý phản hồi"));
    }, [])


    const isRefresh = useSelector((state) => state.feedback.isRefresh);
    const feedbacks = useSelector((state) => state.feedback.data);
    
    
    React.useEffect(() => {
        dispatch(getFeedbacks());
    }, [isRefresh]);
    
    return <>
        <ListFeedback data={feedbacks} />
    </>;
}

export default AdminFeedbackPage;