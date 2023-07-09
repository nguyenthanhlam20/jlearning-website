import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Support from "../../components/Support";
import React from "react";
import { getSupports } from "../../redux/supportSlice";
import SmoothScrollUp from "../../components/Common/SmoothScrollUp";

const SupportPage = () => {

  const dispatch = useDispatch();
  const supports = useSelector((state) => state.support.data);

  React.useEffect(() => {
    dispatch(getSupports());
  }, [])

  return (
    <>
    <SmoothScrollUp />
      <Breadcrumb
        pageName="Hỗ trợ"
        description="Các câu hỏi thường gặp"
      />
      <Support data={supports} />
    </>
  );
};

export default SupportPage;

