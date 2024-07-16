// client/src/components/ProductCard.js
const UserProductCard = ({ product }) => {
  return (
    <div className="border border-blue-300">
      <img src={product.image} title={product.name} />
      <div>
        <h1>{product.productName}</h1>
        <h2>
          Gender: <span>{product.gender}</span>
        </h2>
        <h2>
          Description: <span>{product.description}</span>
        </h2>
        {product.bottleSize && (
          <h2 className="text-gray-700">
            Bottle Size:{" "}
            <span className="text-gray-900">{product.bottleSize}</span>
          </h2>
        )}
        {product.decantSize && (
          <h2 className="text-gray-700">
            Decant Size:{" "}
            <span className="text-gray-900">{product.decantSize}</span>
          </h2>
        )}
        <h2>
          Price: <span>${product.price}</span>
        </h2>
        {product.trade && (
          <h2 className="text-gray-700">
            Available for Trade: <span className="text-gray-900">Yes</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default UserProductCard;
