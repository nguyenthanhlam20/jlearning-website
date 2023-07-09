import { Link } from "react-router-dom";

const RelatedPost = ({
  image,
  slug,
  title,
  date,
}) => {
  return (
    <div className="flex items-top lg:block xl:flex">
      <div className="mr-5 ">
        <img src={image} alt={title} width={200} height={200} />
      </div>
      <div className="w-full">
        <h5>
          <Link
            to={slug}
            className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color">{date}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
