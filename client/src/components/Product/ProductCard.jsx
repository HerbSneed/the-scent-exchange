// client/src/components/ProductCard.js
const ProductCard = ({ product }) => {
  return (
    <div>
      <img src={product.image} title={product.name} />
      <div>
        <h1>{product.name}</h1>
        <h1>{product.description}</h1>
        <h1>${product.price}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
