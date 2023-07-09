import { CONTACT_INFORMATIONS } from "../../constants/constants";

const ContactInformation = () => {
  return (
    <div
      className="wow fadeInUp relative z-10 rounded-md bg-primary/[3%] p-8 dark:bg-primary/10 sm:p-11 lg:p-8 xl:p-11"
      data-wow-delay=".2s"
    >
      <h3 className="mb-9 text-2xl font-bold leading-tight text-black dark:text-white">
        {CONTACT_INFORMATIONS.TITLE} 
      </h3>
      <div className="mb-11">
       <div className="mb-5">
          <h2 className="font-bold mb-4"  >{CONTACT_INFORMATIONS.HEADER_1}</h2>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_1A}</p>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_1B}</p>
       </div>
       <div className="mb-5">
          <h2 className="font-bold  mb-4" >{CONTACT_INFORMATIONS.HEADER_2}</h2>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_2A}</p>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_2B}</p>
       </div>
       <div className="mb-5">
          <h2 className="font-bold mb-4" >{CONTACT_INFORMATIONS.HEADER_3}</h2>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_3A}</p>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_3B}</p>
          <p className="mb-4">- {CONTACT_INFORMATIONS.CONTENT_3C}</p>
       </div>
      </div>
     
    </div>
  );
};

export default ContactInformation;
