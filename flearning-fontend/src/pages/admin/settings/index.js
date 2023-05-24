import React from "react";
import userSlice from "../../../redux/userSlice";
import { useDispatch } from "react-redux";


const AdminSettingsPage = () => {

    const dispatch = useDispatch();
    const { setCurrentPage } = userSlice.actions;
    React.useEffect(() => {
        dispatch(setCurrentPage("Cài đặt"));
    }, [])
    return <>

    </>;
}

export default AdminSettingsPage;