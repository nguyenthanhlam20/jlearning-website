import React from "react";
import userSlice from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSupports } from "../../../redux/supportSlice";
import ListSupport from "../../../components/Support/ListSupport";

const AdminSupportPage = () => {
    const dispatch = useDispatch();
    const { setCurrentPage } = userSlice.actions;
    React.useEffect(() => {
        dispatch(setCurrentPage("Quản lý hỗ trợ"));
    }, [])

    const supports = useSelector((state) => state.support.data);

    const isRefreshSupport = useSelector((state) => state.support.isRefreshSupport);

    React.useEffect(() => {
        dispatch(getSupports());
    }, [isRefreshSupport]);

    return <>
        <ListSupport data={supports} />
    </>;
}

export default AdminSupportPage;