import styles from "./confirm-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router";
import React, { FC, ReactNode, useCallback } from "react";
import { TIngredient } from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import OrderDetails from "../order-details/order-details";
import { createNewOrder } from "../../services/actions/order-details";

type TSize = "small" | "medium" | "large" | undefined;

type TConfirmOrderProps = {
  section: string;
  className: string;
  onlyButton?: boolean;
  size: TSize;
  textButton: string;
};

const ConfirmOrder: FC<TConfirmOrderProps> = React.memo(
  ({ section, className, onlyButton, size, textButton }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isModalOpen, openModal, closeModal } = useModal();
    const { user } = useSelector((store) => store.userData);
    const { bun, burgerConstructor } = useSelector(
      (store) => store.burgerConstructor
    );

    function calculatePrice(): ReactNode {
      const priceWithoutBuns = burgerConstructor.reduce(
        (
          sum: number,
          ingredient: { ingredient: TIngredient; uniqueId: string }
        ) => {
          return (sum += ingredient.ingredient.price);
        },
        0
      );

      return bun?.ingredient
        ? bun.ingredient.price * 2 + priceWithoutBuns
        : priceWithoutBuns;
    }

    const getIngredientsIds: () => string[] = useCallback((): string[] => {
      const arrayIds: string[] = [];
      if (bun?.ingredient) {
        arrayIds.push(bun.ingredient._id);
      }
      for (let i = 0; i < burgerConstructor.length; i++) {
        arrayIds.push(burgerConstructor[i].ingredient._id);
      }
      if (bun?.ingredient) {
        arrayIds.push(bun.ingredient._id);
      }

      return arrayIds;
    }, [burgerConstructor]);

    function handlerClick() {
      dispatch(createNewOrder(getIngredientsIds()));
      openModal();
    }

    return (
      <>
        {isModalOpen && (
          <Modal functionToClose={closeModal} indents={"mt-5 mb-4"}>
            <OrderDetails />
          </Modal>
        )}

        <div className={`mt-10 ${styles.confirmOrder} ${className}`}>
          {!onlyButton && (
            <div className={`mr-10 ${styles.price}`}>
              <span className={`mr-2 text text_type_digits-medium`}>
                {calculatePrice()}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          )}
          <Button
            data-cy="confirmOrder"
            disabled={burgerConstructor.length > 0 && bun ? false : true}
            htmlType="button"
            type="primary"
            size={size}
            onClick={
              user
                ? section === "BurgerConstructor"
                  ? handlerClick
                  : undefined
                : () => {
                    navigate("/login");
                  }
            }
          >
            {textButton}
          </Button>
        </div>
      </>
    );
  }
);

export default ConfirmOrder;
