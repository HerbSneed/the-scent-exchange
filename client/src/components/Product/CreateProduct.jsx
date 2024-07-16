import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "../../utils/mutations";
import { useCurrentUserContext } from "../../context/CurrentUser";
import { QUERY_CURRENT_USER } from "../../utils/queries";

const CreateNewProduct = () => {
  const [createProduct, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PRODUCT);
  const { currentUser } = useCurrentUserContext();

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email }, // Pass current user's email as a variable
  });

  useEffect(() => {
    if (queryLoading) {
      console.log("Loading data...");
    } else if (queryError) {
      console.error("Error fetching data:", queryError);
    } else {
      console.log("Fetched data:", queryData);
    }
  }, [queryLoading, queryError, queryData]);

  const userData = queryData?.currentUser || null;

  const [productState, setProductState] = useState({
    productName: "",
    description: "",
    gender: "",
    image: null,
    bottle: false,
    bottleSize: "",
    decant: false,
    decantSize: "",
    price: "",
    trade: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      const result = await createProduct({
        variables: {
          productInput: {
            productName: productState.productName,
            gender: productState.gender,
            description: productState.description,
            image: productState.image,
            bottle: productState.category === "Bottle",
            bottleSize:
              productState.category === "Bottle" ? productState.bottleSize : "",
            decant: productState.category === "Decant",
            decantSize:
              productState.category === "Decant" ? productState.decantSize : "",
            price: parseFloat(productState.price),
            trade: productState.trade === "true",
          },
        },
      });
      const newProduct = result.data.createProduct;
      console.group("New Product created:", newProduct);
      setIsModalOpen(false); // Close modal after product creation
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductState({
      ...productState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (event) => {
    setProductState({
      ...productState,
      image: event.target.files[0],
    });
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleCreateProduct}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={productState.productName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={productState.gender}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productState.price}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="trade"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Available for Trade
                    </label>
                    <select
                      id="trade"
                      name="trade"
                      value={productState.trade}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bottle or Decant
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={productState.category}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select category</option>
                      <option value="Bottle">Bottle</option>
                      <option value="Decant">Decant</option>
                    </select>
                  </div>

                  {productState.category === "Bottle" && (
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="bottleSize"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Bottle Size
                      </label>
                      <input
                        type="text"
                        name="bottleSize"
                        value={productState.bottleSize}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter bottle size"
                        required
                      />
                    </div>
                  )}

                  {productState.category === "Decant" && (
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="decantSize"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Decant Size
                      </label>
                      <input
                        type="text"
                        name="decantSize"
                        value={productState.decantSize}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter decant size"
                        required
                      />
                    </div>
                  )}

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      name="description"
                      value={productState.description}
                      onChange={handleChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>

                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    name="image"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                  />
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="user_avatar_help"
                  >
                    A product picture is useful for customers to verify the
                    product.
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewProduct;
