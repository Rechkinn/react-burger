import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import {
  ADD_ORDER,
  getOrderById,
  REMOVE_ORDER,
} from "../../services/actions/order-details";
import { OrderComposition } from "../../components/order-composition/order-composition";
import { useParams } from "react-router";
import { TOrder } from "../../utils/types";

export const OrderCompositionPage: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<string>();
  const { messages } = useSelector((store) => store.ws);
  const { getOrderByIdRequest, getOrderByIdRequestError } = useSelector(
    (store) => store.orderDetails
  );
  useEffect(() => {
    const orderForSave = messages[messages.length - 1]?.orders.find(
      (order: TOrder) => order._id === number
    );
    if (orderForSave) {
      dispatch({
        type: ADD_ORDER,
        orderForViewing: { ...orderForSave },
      });
    } else {
      dispatch(getOrderById(number));
    }

    return () => {
      dispatch({
        type: REMOVE_ORDER,
      });
    };
  }, []);

  return (
    <>
      {getOrderByIdRequest && (
        <div className="text text_type_main-medium">Загрузка заказа...</div>
      )}
      {!getOrderByIdRequest && getOrderByIdRequestError && (
        <div className="text text_type_main-medium">
          Ошибка загрузки заказа!
        </div>
      )}
      {!getOrderByIdRequest && !getOrderByIdRequestError && (
        <div className="mt-30">
          <OrderComposition textAlign="center" />
        </div>
      )}
    </>
  );
};
