import { IngredientType } from "../../utils/types";
import styles from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.ingredientDetails}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`mb-4 ${styles.image}`}
      />

      <h2 className="mb-8 text text_type_main-medium">{ingredient.name}</h2>
      <div
        className={`text text_type_main-small text_color_inactive ${styles.characteristics}`}
      >
        <div>
          <p>Калории,ккал</p>
          <p className="text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div>
          <p>Белки, г</p>
          <p className="text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div>
          <p>Жиры, г</p>
          <p className="text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div>
          <p>Углеводы, г</p>
          <p className="text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = { ingredient: IngredientType.isRequired };
