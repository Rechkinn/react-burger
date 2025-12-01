import { FC, useEffect, useState } from "react";
import styles from "./profile-orders.module.css";
import { OrderCard } from "../../components/order-card/order-card";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { EIngredientType, WSS_URL } from "../../utils/consts";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/web-socket";
import { getCookie } from "../../utils/cookie";
import { TIngredient, TOrder } from "../../utils/types";

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      wsUrl: `${WSS_URL}?token=${getCookie("token")}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  const { messages } = useSelector((store) => store.ws);

  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  const [orders, setOrders] = useState<TOrder[]>([]);
  useEffect(() => {
    let arr = messages[messages.length - 1]?.orders;

    if (!arr) return;

    const correctlyOrders: TOrder[] = [];
    let countBuns: number = 0;
    let hasAnyIngredient: boolean = false;

    for (let i = 0; i < arr.length; i++) {
      hasAnyIngredient = false;
      countBuns = 0;
      let ingredientsOrder: string[] = arr[i].ingredients;
      for (let k = 0; k < ingredientsOrder.length; k++) {
        const ingredient: TIngredient | undefined = burgerIngredients.find(
          (item) => item._id === ingredientsOrder[k]
        );
        if (ingredient?.type === EIngredientType.BUN) {
          countBuns++;
        } else {
          hasAnyIngredient = true;
        }
      }

      if (countBuns === 2 && hasAnyIngredient) {
        correctlyOrders.push(arr[i]);
      }
    }

    setOrders(correctlyOrders);
  }, [messages]);

  return (
    <div className={styles.orders}>
      {orders.map((order) => {
        return (
          <OrderCard
            withStatus
            order={order}
            key={order._id}
            extraClass="mr-2"
          />
        );
      })}
    </div>
  );
};
