import { useCurrentUserContext } from "../context/CurrentUser"; // Importing custom hook to access current user data
import Auth from "../utils/auth"; // Importing utility for authentication
import { useMutation, useQuery } from "@apollo/client"; // Importing hooks for GraphQL queries and mutations
import { QUERY_CURRENT_USER } from "../utils/queries"; // Importing GraphQL query for current user data
import CreateNewProduct from "../components/Product/CreateProduct";
import Footer from "../components/Common/Footer";

// Dashboard component
const Dashboard = () => {
  const { currentUser } = useCurrentUserContext(); 
  console.log("current user", currentUser)

  // Query to fetch current user data
  const { data } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email }, 
  });

  const userData = data?.currentUser || null; 
  console.log("UserData", userData)


  return (
    <>
      <div
        key={userData?.email}
        className="relative bg-white border-t-[1px] border-gray-400 min-h-screen px-5 mx-auto w-[100%]"
      >
        {/* Dashboard header */}
        <h1 className="text-center text-3xl xl:text-4xl font-[newsReader] font-bold p-3 mt-1 drop-shadow-lg text-blue-600">
          {userData?.userName}&apos;s Dashboard
        </h1>

        {/* Message for empty saved articles */}
        <h1
          className={`font-bold font-[newsReader] -mt-3 drop-shadow-lg text-center text-2xl xl:text-3xl text-red-700 
          ${userData?.userProducts.length > 0 ? "hidden" 
              : ""}`}
        >
          You have no listed products
        </h1>

        {/* Saved news cards */}
        <div className="top-0 w-full ">
          <div
            className="
          w-full
          grid 
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3 
          2xl:grid-cols-4
          gap-4
          px-3
          pb-5"
          >
            <CreateNewProduct />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
