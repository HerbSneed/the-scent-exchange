import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "../../utils/mutations";
import { useCurrentUserContext } from "../../context/CurrentUser";
import { QUERY_CURRENT_USER } from "../../utils/queries";
import axios from "axios";
import AvatarEditor from "react-avatar-editor";


const CreateNewProduct = () => {
  const [createProduct, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PRODUCT);
  const { currentUser } = useCurrentUserContext();
  const editorRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [error, setErrors] = useState({});

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
    } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email },
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


  const [productState, setProductState] = useState({
    productBrand: "",
    productName: "",
    concentration: "",
    description: "",
    productURL: "",
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

    let imageUrl = "";
    if (productState.image && editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      const formData = new FormData();
      formData.append("file", canvas);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_PRODUCT_UPLOAD_PRESET
      );
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrors({ ...error, image: "Image upload failed" });
        return; // Exit early if image upload fails
      }
    }

    try {
      let variables = {
        productInput: {
          productBrand: productState.productBrand,
          productName: productState.productName,
          concentration: productState.concentration,
          gender: productState.gender,
          description: productState.description,
          productURL: productState.productURL,
          image: imageUrl,
          bottle: productState.bottle === "Bottle",
          bottleSize:
            productState.bottle === "Bottle" ? productState.bottleSize : "",
          decant: productState.bottle === "Decant",
          decantSize:
            productState.bottle === "Decant" ? productState.decantSize : "",
          price: parseFloat(productState.price),
          trade: productState.trade,
        },
      };

      const newProduct = await createProduct({
        variables,
      });

        if (newProduct?.data?.createProduct) {
          setIsModalOpen(false); 
        } else {
          console.error("New Product is null:", newProduct);
        }
      } catch (err) {
        console.error("Error creating product:", err);
      }
    };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "radio") {
      setProductState({
        ...productState,
        [name]: value,
      });
    } else {
      setProductState({
        ...productState,
        [name]: type === "checkbox" ? checked : value,
      });
    }
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
        New Product
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
                  {/* Product Brand */}
                  <div className="col-span-2">
                    <label
                      htmlFor="productBrand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="productBrand"
                      value={productState.productBrand}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                      placeholder="Type product name"
                      required
                    />
                  </div>

                  {/* Product Name */}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                      placeholder="Type product name"
                      required
                    />
                  </div>

                  {/* Concentration */}
                  <div className="flex flex-wrap">
                    <h2>Concentration</h2>

                    <div className="flex items-center me-4">
                      <input
                        id="aftershave-radio"
                        type="radio"
                        name="concentration"
                        value="Aftershave"
                        checked={productState.concentration === "Aftershave"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="aftershave-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Aftershave
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="EauFraiche-radio"
                        type="radio"
                        name="concentration"
                        value="Eau Fraiche"
                        checked={productState.concentration === "Eau Fraiche"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="EauFraiche-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Eau Fraiche
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="Eau-de-Cologne-radio"
                        type="radio"
                        name="concentration"
                        value="Eau de Cologne"
                        checked={
                          productState.concentration === "Eau de Cologne"
                        }
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Eau-de-Cologne-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Eau de Cologne
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="Eau-de-Toilet-radio"
                        type="radio"
                        name="concentration"
                        value="Eau de Toilette"
                        checked={
                          productState.concentration === "Eau de Toilette"
                        }
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Eau-de-Toilet-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                      >
                        Eau de Toilette
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="Eau-de-Parfum-radio"
                        type="radio"
                        name="concentration"
                        value="Eau de Parfum"
                        checked={productState.concentration === "Eau de Parfum"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Eau-de-Parfum-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                      >
                        Eau de Parfum
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="Parfum-radio"
                        type="radio"
                        name="concentration"
                        value="Parfum"
                        checked={productState.concentration === "Parfum"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Parfum-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                      >
                        Parfum
                      </label>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col">
                    <h2>Gender</h2>

                    <div className="flex items-center me-4">
                      <input
                        id="Male-radio"
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={productState.gender === "Male"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Male-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="Female-radio"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={productState.gender === "Female"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Female-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="Unisex-radio"
                        type="radio"
                        name="gender"
                        value="Unisex"
                        checked={productState.gender === "Unisex"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="Unisex-radio"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Unisex
                      </label>
                    </div>
                  </div>

                  {/* Bottle */}
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="bottle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bottle or Decant
                    </label>
                    <select
                      id="bottle"
                      name="bottle"
                      value={productState.bottle}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
                    >
                      <option value="">Select Bottle or Decant</option>
                      <option value="Bottle">Bottle</option>
                      <option value="Decant">Decant</option>
                    </select>
                  </div>

                  {productState.bottle === "Bottle" && (
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
                        placeholder="Size of bottle"
                      />
                    </div>
                  )}

                  {productState.bottle === "Decant" && (
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
                        placeholder="Size of decant"
                      />
                    </div>
                  )}

                  {/* Price */}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full"
                      placeholder="$2999"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={productState.description}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
                      placeholder="Type product description"
                      required
                    />
                  </div>

                  {/* Product URL*/}
                  <div className="col-span-2">
                    <label
                      htmlFor="productURL"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product URL
                    </label>
                    <input
                      name="productURL"
                      value={productState.productURL}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 focus:ring-primary-600 focus:border-primary-600 block w-full"
                      placeholder="ex. Fragantica, Basenotes, Parfumo"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      required
                    />
                    {productState.image && (
                      <div>
                        <AvatarEditor
                          ref={editorRef}
                          image={productState.image}
                          width={500}
                          height={500}
                          borderRadius={100}
                          color={[255, 255, 255, 0.6]}
                          scale={scale}
                          rotate={0}
                        />
                        <input
                          type="range"
                          value={scale}
                          min="1"
                          max="2"
                          step="0.01"
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-span-2 flex items-center">
                    <label
                      htmlFor="trade"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Trade
                    </label>
                    <input
                      type="checkbox"
                      name="trade"
                      checked={productState.trade}
                      onChange={handleChange}
                      className="ml-2 w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={mutationLoading}
                  className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500"
                >
                  {mutationLoading ? "Creating..." : "Create Product"}
                </button>
                {mutationError && (
                  <div className="mt-3 text-red-500">
                    Error creating product: {error.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewProduct;
