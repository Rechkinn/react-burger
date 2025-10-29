import styles from "./ingredient-details-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";
import { useEffect } from "react";
import NotFound from "../not-found/not-found";

export default function IngredientDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  useEffect(() => {
    return () => {
      dispatch({
        type: REMOVE_INGREDIENT_DETAILS,
      });
    };
  }, []);

  function tryGetIngredient() {
    for (let i = 0; i < burgerIngredients.length; i++) {
      if (burgerIngredients[i]._id === id) {
        dispatch({
          type: ADD_INGREDIENT_DETAILS,
          ingredientDetails: burgerIngredients[i],
        });
        return true;
      }
    }
    return false;
  }

  return tryGetIngredient() ? (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  ) : (
    <NotFound />
  );
}
