import { memo } from "react";
import { useCurrentUserContext } from "../../context/CurrentUser";

// MoreHeadlinesCard component
const MoreProductsCard = memo(({ news, handleSaveArticle, isLastItem }) => {
  // Get the isLoggedIn function from the CurrentUserContext
  const { isLoggedIn } = useCurrentUserContext();

  return (
    <>
      <div>

      </div>

    </>
  );
});

MoreProductsCard.displayName = "MoreHeadlinesCard";

export default MoreProductsCard;
