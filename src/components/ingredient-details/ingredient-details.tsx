import { useParams } from "react-router";
import NotFound from "../../pages/not-found/not-found";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";
import styles from "./ingredient-details.module.css";
import React, { useEffect, FC, useCallback } from "react";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";

const IngredientDetails: FC = React.memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  const { ingredientDetails } = useSelector((store) => store.ingredientDetails);
  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  const tryGetIngredient: () => void = useCallback((): void => {
    for (let i = 0; i < burgerIngredients.length; i++) {
      if (burgerIngredients[i]._id === id) {
        dispatch({
          type: ADD_INGREDIENT_DETAILS,
          ingredientDetails: burgerIngredients[i],
        });
        return;
      }
    }
  }, [dispatch, burgerIngredients, id]);

  useEffect(() => {
    if (!ingredientDetails?._id) {
      tryGetIngredient();
    }
  }, [ingredientDetails?._id, tryGetIngredient]);

  useEffect(() => {
    return () => {
      dispatch({
        type: REMOVE_INGREDIENT_DETAILS,
      });
    };
  }, [dispatch]);

  return (
    <>
      {ingredientDetails?._id ? (
        <div className={styles.ingredientDetails}>
          <img
            src={ingredientDetails.image_large}
            alt={ingredientDetails.name}
            className={`mb-4 ${styles.image}`}
          />

          <h2 className="nameIngredient mb-8 text text_type_main-medium">
            {ingredientDetails.name}
          </h2>
          <div
            className={`text text_type_main-small text_color_inactive ${styles.characteristics}`}
          >
            <div>
              <p>Калории,ккал</p>
              <p className="calories text_type_digits-default text_color_inactive">
                {ingredientDetails.calories}
              </p>
            </div>
            <div>
              <p>Белки, г</p>
              <p className="proteins text_type_digits-default text_color_inactive">
                {ingredientDetails.proteins}
              </p>
            </div>
            <div>
              <p>Жиры, г</p>
              <p className="fat text_type_digits-default text_color_inactive">
                {ingredientDetails.fat}
              </p>
            </div>
            <div>
              <p>Углеводы, г</p>
              <p className="carbohydrates text_type_digits-default text_color_inactive">
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
});

export default IngredientDetails;
