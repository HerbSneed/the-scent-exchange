import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindowSize } from "../utils/windowSize";
import { useCurrentUserContext } from "../context/CurrentUser";
import { QUERY_CURRENT_USER } from "../utils/queries";
import Footer from "../components/Common/Footer";
import FeaturedProductCard from "../components/Product/featured-products-card";
import MoreProductsCard from "../components/Product/more-products-card";
import CategoryHeader from "../components/Common/Category-Header";
import ProductCard from "../components/Product/ProductCard";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const { get } = axios;
  const { currentUser, isLoggedIn } = useCurrentUserContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [selectedCategory, setSelectedCategory] = useState("Top News");


  const sliceEnd =
    width >= 1536 ? 4 : width >= 1280 ? 4 : width >= 1024 ? 2 : 1;
  const moreNewsSliceEnd =
    width >= 1536 ? 35 : width >= 1280 ? 35 : width >= 1024 ? 25 : 15;

  const { data } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  const userData = data?.currentUser || null;
  const categories = [
    "Top Sellers",
    "Male Fragrances",
    "Female Fragrances",
    "Unisex Fragrances",
    "Influencers"
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/category=${encodeURIComponent(category)}`);
  };




  return (
    <>
      <CategoryHeader
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <div
        id="homepage-container"
        className="bg-white min-h-screen pt-1 mt-2 sm:pt-2 border-t-[1px] w-full border-gray-500"
      >
        <section
          id="top-news"
          className="grid grid-cols-1 2xl:w-7/12 xl:w-8/12 lg:w-8/12 lg:float-right 2xl:float-right gap-x-2 xl:gap-y-4  gap-y-0 pb-3 mx-3 2xl:mx-3 bg-white"
        >
          <h1>Featured Products</h1>


        <FeaturedProductCard/>
     
        </section>

        <section id="more-news-hl" className="grid grid-cols-1 mx-3 mb-2">
          <h2
            className="
          text-2xl 
          md:text-center 
          xl:text-center
          lg:text-[30px] 
          text-white 
          px-2 pt-1 
          lg:pt-2.5 
          lg:py-2 
          2xl:pt-3 
          sm:text-3xl 
          2xl:text-4xl 
          bg-blue-600 
          font-[Newsreader] 
          ml-0 mb-1  2xl:ml-0 font-semibold drop-shadow-lg"
          >
            More {selectedCategory} Headlines
          </h2>

          
          <MoreProductsCard/>
   
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
