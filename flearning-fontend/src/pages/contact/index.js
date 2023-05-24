import Breadcrumb from "../../components/Common/Breadcrumb";
import Contact from "../../components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Liên hệ"
        description="Dễ dàng và nhanh chóng"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
