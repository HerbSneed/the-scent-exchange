// client/src/components/ProductCard.js
const UserProductCard = ({ product }) => {
  console.log("Rendering product with ID:", product._id); // Add this line for debugging

  return (
    <div className="border border-blue-300 p-4">
      <img src={product.image} title={product.name} className="w-full" />
      <div>
        <h1 className="text-xl font-bold">{product.productBrand}</h1>
        <h2 className="text-lg font-semibold break-words">
          {product.productName}
        </h2>
        <h2 className="text-lg font-semibold break-words">
          {product.concentration}
        </h2>
        <h2 className="text-lg font-semibold break-words">
          Gender: <span>{product.gender}</span>
        </h2>
        <h2 className="text-lg font-semibold break-words">
          Description: <span>{product.description}</span>
        </h2>
        <h2 className="text-lg font-semibold break-words">
          URL:{" "}
          <a
            href={product.productURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {product.productURL}
          </a>
        </h2>

        {product.bottleSize && (
          <h2 className="text-gray-700 text-lg font-semibold break-words">
            Bottle Size:{" "}
            <span className="text-gray-900">{product.bottleSize}</span>
          </h2>
        )}
        {product.decantSize && (
          <h2 className="text-gray-700 text-lg font-semibold break-words">
            Decant Size:{" "}
            <span className="text-gray-900">{product.decantSize}</span>
          </h2>
        )}
        <h2 className="text-lg font-semibold break-words">
          Price: <span>${product.price}</span>
        </h2>
        {product.trade && (
          <h2 className="text-gray-700 text-lg font-semibold break-words">
            Available for Trade: <span className="text-gray-900">Yes</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default UserProductCard;
