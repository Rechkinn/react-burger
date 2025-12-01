import styles from "./ingredient-details-page.module.css";
import { useSelector } from "../../utils/additionalStorageTyping";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { FC } from "react";
import NotFound from "../not-found/not-found";

const IngredientDetailsPage: FC = () => {
  const { id } = useParams<string>();
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  return burgerIngredients.find((ingredient) => ingredient._id === id) ? (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  ) : (
    <NotFound />
  );
};

export default IngredientDetailsPage;
