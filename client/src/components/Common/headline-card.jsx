import { memo } from "react";
import { useCurrentUserContext } from "../../context/CurrentUser";

// HeadlineCard component
const HeadlineCard = memo(({ news, handleSaveArticle }) => {
  // Get the isLoggedIn function from the CurrentUserContext
  const { isLoggedIn } = useCurrentUserContext();

  return (
    <>
      <div key={news.newsId} className="bg-white">
        <div className={`${news.index === 0 ? "" : ""}`}>
          {news.image && (
            <img
              className="w-full rounded-sm mt-1.5 shadow-md"
              src={news.image}
              alt={`Image for ${news.title}`}
            />
          )}

          <div className="mt-1">
            <h2 className="text-xs md:text-sm lg:text-md text-gray-900">
              {news.latest_publish_date}
            </h2>

            <h1 className="font-bold text-gray-900 leading-7 md:leading-8 text-[25px] sm:text-[27px] md:text-[32px]">
              {news.title}
            </h1>
            <p className="mt-0.5 text-xl leading-5">{news.summary}</p>

            {isLoggedIn() && (
              <div className="flex pb-0 md:text-[22px]">
                <a
                  href={news.url}
                  target="_blank"
                  className="text-blue-700 hover:font-bold"
                  rel="noopener noreferrer"
                  role="button"
                  tabIndex="0"
                >
                  Source
                </a>
                <a
                  target="_blank"
                  className="text-red-700 ml-3 hover:font-bold"
                  onClick={() => handleSaveArticle(news)}
                  rel="noopener noreferrer"
                  role="button"
                  tabIndex="0"
                >
                  Save Article
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

HeadlineCard.displayName = "HeadlineCard";

export default HeadlineCard;
