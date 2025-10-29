import { useParams } from "react-router";
import NotFound from "../../pages/not-found/not-found";
import { ADD_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function IngredientDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredientDetails } = useSelector((store) => store.ingredientDetails);
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  useEffect(() => {
    if (!ingredientDetails?._id) {
      tryGetIngredient();
    }
  }, []);

  function tryGetIngredient() {
    for (let i = 0; i < burgerIngredients.length; i++) {
      if (burgerIngredients[i]._id === id) {
        dispatch({
          type: ADD_INGREDIENT_DETAILS,
          ingredientDetails: burgerIngredients[i],
        });
        return;
      }
    }
  }

  return (
    <>
      {ingredientDetails?._id ? (
        <div className={styles.ingredientDetails}>
          <img
            src={ingredientDetails.image_large}
            alt={ingredientDetails.name}
            className={`mb-4 ${styles.image}`}
          />

          <h2 className="mb-8 text text_type_main-medium">
            {ingredientDetails.name}
          </h2>
          <div
            className={`text text_type_main-small text_color_inactive ${styles.characteristics}`}
          >
            <div>
              <p>Калории,ккал</p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredientDetails.calories}
              </p>
            </div>
            <div>
              <p>Белки, г</p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredientDetails.proteins}
              </p>
            </div>
            <div>
              <p>Жиры, г</p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredientDetails.fat}
              </p>
            </div>
            <div>
              <p>Углеводы, г</p>
              <p className="text_type_digits-default text_color_inactive">
                {ingredientDetails.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default IngredientDetails;
