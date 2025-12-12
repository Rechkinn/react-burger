import { v4 as uuid } from "uuid";
import React, { FC } from "react";
import styles from "./order-card.module.css";
import { TIngredient, TLocation, TOrder } from "../../utils/types";
import {
  EStatusRussia,
  getOrderStatusInRussianLanguage,
} from "../../utils/getOrderStatusInRussianLanguage";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { OrderIngredientImage } from "../order-ingredient-image/order-ingredient-image";
import { Link, useLocation, useNavigate } from "react-router";
import { ADD_ORDER } from "../../services/actions/order-details";
import { calculatePrice } from "../../utils/calculatePrice";

type TOrderCardProps = {
  order: TOrder;
  withStatus?: boolean;
  extraClass?: string;
};

export const OrderCard: FC<TOrderCardProps> = React.memo(
  ({ order, withStatus = false, extraClass }) => {
    const { burgerIngredients } = useSelector(
      (store) => store.burgerIngredients
    );
    const location: TLocation = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getStyleStatus(status: string): string {
      const statusRussia = getOrderStatusInRussianLanguage(status);

      if (statusRussia === EStatusRussia.DONE) return `${styles.done}`;
      else if (statusRussia === EStatusRussia.CREATE)
        return `${styles.created}`;
      else if (statusRussia === EStatusRussia.PENDING)
        return `${styles.pending}`;
      else return `${styles.cancelled}`;
    }

    function openOrderComposition(orderForSave: TOrder): void {
      dispatch({
        type: ADD_ORDER,
        orderForViewing: orderForSave,
      });
      navigate(`${order.number}`, { state: { background: location } });
    }

    return (
      <Link
        to={`${order.number}`}
        state={{ background: location }}
        className={styles.resetLinkStyles}
        onClick={(e) => {
          e.preventDefault();
          openOrderComposition(order);
        }}
      >
        <article className={`${extraClass} ${styles.card}`.trim()}>
          <header className={`mb-6 ${styles.header}`}>
            <p className="text text_type_digits-default">#{order.number}</p>
            <FormattedDate
              date={new Date(order.createdAt)}
              className="text text_type_main-default text_color_inactive"
            />
          </header>
          <div className="mb-6">
            <h2 className="mb-2 text text_type_main-medium">{order.name}</h2>
            {withStatus && (
              <p
                className={`text text_type_main-default ${getStyleStatus(
                  order.status
                )}`.trim()}
              >
                {getOrderStatusInRussianLanguage(order.status)}
              </p>
            )}
          </div>
          <footer className={styles.footer}>
            <div className={styles.ingredientsImages}>
              {order.ingredients.map((ingredientId, i, arr) => {
                if (i > 5) return;
                const ingredient = burgerIngredients.find(
                  (ingredient: TIngredient) => ingredient._id === ingredientId
                );

                return ingredient && i < 5 ? (
                  <div
                    key={uuid()}
                    style={{
                      transform: `translate(${i * -20}px)`,
                      zIndex: `${arr.length - i}`,
                    }}
                  >
                    <OrderIngredientImage image={ingredient.image_mobile} />
                  </div>
                ) : (
                  ingredient && (
                    <div
                      key={uuid()}
                      style={{
                        transform: `translate(${i * -20}px)`,
                        zIndex: `${arr.length - i}`,
                      }}
                    >
                      <OrderIngredientImage
                        image={ingredient.image_mobile}
                        isLast
                        remainder={arr.length - i}
                      />
                    </div>
                  )
                );
              })}
            </div>
            <p className={`text text_type_digits-default ${styles.price}`}>
              <span className="mr-2">
                {calculatePrice(order.ingredients, burgerIngredients)}
              </span>
              <CurrencyIcon type="primary" />
            </p>
          </footer>
        </article>
      </Link>
    );
  }
);
