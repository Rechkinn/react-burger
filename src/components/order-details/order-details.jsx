import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

function OrderDetails() {
  return (
    <div className={`pb-20 ${styles.orderDetails}`}>
      <h1 className={`text text_type_digits-large mb-8 ${styles.id}`}>
        034536
      </h1>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

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
  );
}

export default OrderDetails;
