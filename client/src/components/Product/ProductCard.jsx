// client/src/components/ProductCard.js
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia image={product.image} title={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
