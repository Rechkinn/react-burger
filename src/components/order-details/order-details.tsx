import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../services/actions/order-details";

const OrderDetails: FC = () => {
  const dispatch = useDispatch();
  const { bun, burgerConstructor } = useSelector(
    (store: any) => store.burgerConstructor
  );
  const { orderDetails, orderDetailsRequest, orderDetailsRequestFailed } =
    useSelector((store: any) => store.orderDetails);

  const getIngredientsIds: () => string[] = useCallback((): string[] => {
    const arrayIds: string[] = [];
    for (let i = 0; i < burgerConstructor.length; i++) {
      arrayIds.push(burgerConstructor[i].ingredient._id);
    }
    if (bun?.ingredient) {
      arrayIds.push(bun.ingredient._id);
      arrayIds.push(bun.ingredient._id);
    }
    return arrayIds;
  }, []);

  useEffect(() => {
    dispatch(createNewOrder(getIngredientsIds()));
  }, [dispatch, getIngredientsIds]);

  return (
    <>
      {orderDetailsRequest && (
        <div className="text text_type_main-medium">Загрузка...</div>
      )}

      {orderDetailsRequestFailed && (
        <div className="text text_type_main-medium">
          Ошибка создания заказа!
        </div>
      )}

      {!orderDetailsRequest && !orderDetailsRequestFailed && (
        <div className={`pb-20 ${styles.orderDetails}`}>
          <h1 className={`text text_type_digits-large mb-8 ${styles.id}`}>
            {orderDetails?.order?.number}
          </h1>
          <p className="text text_type_main-medium mb-15">
            идентификатор заказа
          </p>

          <div className={`mb-15 ${styles.backgroundCheckMarkIcon}`}>
            <CheckMarkIcon type="primary" />
          </div>

          <p className="text mb-2 text_type_main-small">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-small text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
