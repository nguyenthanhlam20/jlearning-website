
import { CONTACT_CONSTANTS } from "../../constants/constants";
import ContactInformation from "./Information";
import React from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { insertContact } from "../../redux/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();

  const [fullname, setFullname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSendMessage = () => {
  if(fullname == "" || email == "" || message == "") {
    toast.warning("Nhập tên, email và thông điệp của bạn");
  } else {
    dispatch(insertContact({name: fullname, email: email, request_message: message, request_date: new Date().toLocaleString()}));
    console.log("fullname: " + fullname + ", email: " + email + ", message: " + message);
  }

};  

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                {CONTACT_CONSTANTS.LEFT_HEADER}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                {CONTACT_CONSTANTS.LEFT_MESSAGE}
              </p>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        {CONTACT_CONSTANTS.NAME}
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder={CONTACT_CONSTANTS.ENTER_NAME}
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                       {CONTACT_CONSTANTS.EMAIL}
                      </label>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}

                        placeholder={CONTACT_CONSTANTS.ENTER_EMAIL}
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Thông điệp
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={CONTACT_CONSTANTS.ENTER_MESSAGE}
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                    onClick={handleSendMessage}
                    className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                     {CONTACT_CONSTANTS.SUBMIT}
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <ContactInformation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
