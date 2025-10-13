import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../services/actions/order-details";

function OrderDetails() {
  const { burgerConstructor } = useSelector((store) => store.burgerConstructor);

  const dispatch = useDispatch();

  const { orderDetails, orderDetailsRequest, orderDetailsRequestFailed } =
    useSelector((store) => store.orderDetails);

  console.log("orderDetails", orderDetails);

  useEffect(() => {
    dispatch(createNewOrder(getIngredientsIds()));
  }, []);

  function getIngredientsIds() {
    return [...burgerConstructor.filter((ingredient) => ingredient._id)];
  }

  return (
    <>
      {orderDetailsRequest && <div>Загрузка...</div>}
      {!orderDetailsRequest && orderDetailsRequestFailed && (
        <div>Ошибка создания заказа!</div>
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
            <CheckMarkIcon />
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
}

export default OrderDetails;
