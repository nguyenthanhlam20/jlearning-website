import Breadcrumb from "../../components/Common/Breadcrumb";
import SmoothScrollUp from "../../components/Common/SmoothScrollUp";
import Contact from "../../components/Contact";

const ContactPage = () => {
  return (
    <>
        <SmoothScrollUp />

      <Breadcrumb
        pageName="Liên hệ"
        description="Dễ dàng và nhanh chóng"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
