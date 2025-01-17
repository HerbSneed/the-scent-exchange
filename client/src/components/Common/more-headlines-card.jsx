import { memo } from "react";
import { useCurrentUserContext } from "../../context/CurrentUser";

// MoreHeadlinesCard component
const MoreHeadlinesCard = memo(({ news, handleSaveArticle, isLastItem }) => {
  // Get the isLoggedIn function from the CurrentUserContext
  const { isLoggedIn } = useCurrentUserContext();

  return (
    <>
      <div
        key={news.newsId}
        className={`bg-gray-200 mt-1 px-2 py-1 ${isLastItem ? "border-none" : "bg-gray-200"}`}
      >
        <div className={`${news.index === 5 ? "" : ""}`}>
          <div className="mt-0">
            <h1 className="font-bold text-gray-900 text-[17px] sm:text-[20px] md:text-[23px]  truncate">
              {news.title}
            </h1>
            <h2 className="text-xs md:text-sm -mt-1 text-gray-900">
              {news.latest_publish_date}
            </h2>

            {isLoggedIn() && (
              <div className="flex -mt-1 sm:-mt-0.5 lg:-mt-1 2xl:-mt-1 md:text-[20px]">
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
                  className="text-red-700 ml-5 hover:font-bold"
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

MoreHeadlinesCard.displayName = "MoreHeadlinesCard";

export default MoreHeadlinesCard;
