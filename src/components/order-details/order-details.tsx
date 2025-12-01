import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import React, { FC } from "react";
import { useSelector } from "../../utils/additionalStorageTyping";

const OrderDetails: FC = React.memo(() => {
  const { orderDetails, orderDetailsRequest, orderDetailsRequestFailed } =
    useSelector((store) => store.orderDetails);

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
});

export default OrderDetails;
