import React from "react";
import ListContact from "../../../components/Contact/ListContact";
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from "../../../redux/contactSlice";
import userSlice from "../../../redux/userSlice";

const AdminContactPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.data);
  const isRefresh = useSelector((state) => state.contact.isRefresh);
  
  const { setCurrentPage } = userSlice.actions;
  React.useEffect(() => {
    dispatch(setCurrentPage("Quản lý liên hệ"));
  }, [])

  React.useEffect(() => {
    dispatch(getContacts());
  }, [isRefresh])

  return <>
    <ListContact data={contacts} />
  </>
};


export default AdminContactPage;
