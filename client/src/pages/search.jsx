import { useState, useEffect } from "react";
import { useWindowSize } from "../utils/windowSize.js";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/Common/search-bar.jsx";
import SearchResultsCard from "../components/Common/search-results-card.jsx";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_CURRENT_USER } from "../utils/queries.js";
import { useCurrentUserContext } from "../context/CurrentUser.jsx";
import axios from "axios";
import Footer from "../components/Common/Footer.jsx";

const Search = () => {
  // State for search query, news items, and save news mutation
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("latest");
  const [newsItems, setNewsItems] = useState([]);
  const [saveNewsMutation] = useMutation(SAVE_NEWS);

  // Current user data from context
  const { currentUser } = useCurrentUserContext();

  // Get window size
  const { width } = useWindowSize();

  // Define slice end for news items
  const sliceEnd =
    width >= 1536
      ? 75
      : width >= 1280
        ? 75
        : width >= 1024
          ? 52
          : width >= 768
            ? 52
            : width >= 640
            ? 52
            : 40;

  // Query current user data
  const { data } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email },
  });

  // Extract user data from query response
  const userData = data?.currentUser || null;

  // Effect to update search query when URL search changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    setSearchQuery(query);
  }, [location.search]);

  // Effect to fetch news when search query changes
  useEffect(() => {
    const fetchSearchedNews = async () => {
      try {
        let response;
        response = await axios.get(`api/search?searchQuery=${searchQuery}`);

        if (response.status !== 200) {
          console.error("Error in response:", response);
          return;
        }

        const headlines = response.data;

        const uniqueNewsItems = new Set(); // Use a set to keep track of unique news items

        headlines.articles.forEach((news) => {
          if (
            news.urlToImage !== null &&
            news.title !== "[Removed]" &&
            news.title !== "null" &&
            news.status !== "410" &&
            news.status !== "404"
          ) {
            const newsId = news.publishedAt + news.title + news.source.name;

            if (!uniqueNewsItems.has(newsId)) {
              uniqueNewsItems.add(newsId);

              const formattedNews = {
                newsId: newsId,
                title: news.title,
                image: news.urlToImage,
                url: news.url,
                summary: news.description || "Summary not available.",
                source_country: news.source.name,
                latest_publish_date: formatDateTime(news.publishedAt),
              };

              setNewsItems((prevNewsItems) => [
                ...prevNewsItems,
                formattedNews,
              ]);
            }
          }
        });
      } catch (err) {
        console.error("Error in fetchNews:", err);
      }
    };

    // Fetch news only if search query is not "latest"
    if (searchQuery !== "latest") {
      fetchSearchedNews();
    }
  }, [searchQuery]);

  // Function to handle saving an article
  const handleSaveArticle = (news) => {
    // Call the mutation to save the news
    const alreadySaved = userData.savedNews.some((savedNews) => {
      return savedNews.newsId === news.newsId;
    });

    if (alreadySaved) {
      alert("News already saved");
      return;
    }

    saveNewsMutation({
      variables: {
        saveNews: {
          newsId: news.newsId,
          title: news.title,
          summary: news.summary,
          source_country: news.source_country,
          url: news.url,
          image: news.image,
          language: news.language,
          latest_publish_date: news.latest_publish_date,
        },
      },
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to format date and time
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + 1);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  return (
    <>
      <div id="searchPage-container" className="flex flex-col pb-5">
        <div className="mt-3">
          <SearchBar />
        </div>

        <section className="relative pt-2 mx-auto  w-full">
          <div className="z-20 bg-compBlue pb-10 w-full drop-shadow-lg">
            <h1 className="z-20 text-4xl md:text-5xl drop-shadow-md font-semibold font-[Newsreader] text-center text-blue-500">
              Search Results
            </h1>

            <div className="grid grid-cols-1  sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {newsItems.slice(0, sliceEnd).map((news) => (
                <SearchResultsCard
                  key={news.newsId}
                  news={news}
                  handleSaveArticle={handleSaveArticle}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Search;
