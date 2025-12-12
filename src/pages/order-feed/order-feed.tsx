import { OrderCard } from "../../components/order-card/order-card";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/web-socket";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { EIngredientType, WSS_URL } from "../../utils/consts";
import { EStatusEnglish } from "../../utils/getOrderStatusInRussianLanguage";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./order-feed.module.css";
import { FC, useEffect, useState } from "react";

export const OrderFeed: FC = () => {
  const { messages } = useSelector((store) => store.ws);

  const { burgerIngredients } = useSelector((store) => store.burgerIngredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      wsUrl: `${WSS_URL}/all`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

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
          (ingredient: TIngredient) => ingredient._id === ingredientsOrder[k]
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
    <main className={styles.main}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        Лента заказов
      </h1>
      <div className={styles.contentWrapper}>
        <section className={styles.orders}>
          {orders.map((order: TOrder) => {
            return (
              <OrderCard key={order._id} order={order} extraClass="mr-2" />
            );
          })}
        </section>
        <section className={styles.numbers}>
          <div className={`mb-15 ${styles.statuses}`}>
            <div>
              <h2 className="mb-6 text text_type_main-medium">Готовы:</h2>
              <div className={styles.numbersOrders}>
                {orders.map(({ number, status }) => {
                  if (status === EStatusEnglish.DONE) {
                    return (
                      <p
                        key={number}
                        className={`text text_type_digits-default ${styles.orderCompleted}`}
                      >
                        {number}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text text_type_main-medium">В работе:</h2>
              <div className={styles.numbersOrders}>
                {orders.map(({ number, status }) => {
                  if (status === EStatusEnglish.PENDING) {
                    return (
                      <p key={number} className="text text_type_digits-default">
                        {number}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2>
          <p className="mb-15 text text_type_digits-large">
            {messages[messages.length - 1]?.total ?? 0}
          </p>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p className="text text_type_digits-large">
            {messages[messages.length - 1]?.totalToday ?? 0}
          </p>
        </section>
      </div>
    </main>
  );
};
