import styles from "./confirm-order.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FC, ReactNode } from "react";
import { TIngredient } from "../../utils/types";

type TSize = "small" | "medium" | "large" | undefined;

type TConfirmOrderProps = {
  section: string;
  className: string;
  onlyButton?: boolean;
  size: TSize;
  textButton: string;
};

const ConfirmOrder: FC<TConfirmOrderProps> = ({
  section,
  className,
  onlyButton,
  size,
  textButton,
}) => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { user } = useSelector((store: any) => store.userData);
  const { bun, burgerConstructor } = useSelector(
    (store: any) => store.burgerConstructor
  );

  function calculatePrice(): ReactNode {
    const priceWithoutBuns = burgerConstructor.reduce(
      (
        sum: number,
        ingredient: { ingredient: TIngredient; uniqueId: string }
      ) => {
        console.log("ingredient");
        console.log(ingredient);
        return (sum += ingredient.ingredient.price);
      },
      0
    );

    return bun?.ingredient
      ? bun.ingredient.price * 2 + priceWithoutBuns
      : priceWithoutBuns;
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
          disabled={burgerConstructor.length > 0 && bun ? false : true}
          htmlType="button"
          type="primary"
          size={size}
          onClick={
            user
              ? section === "BurgerConstructor"
                ? openModal
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
};

export default ConfirmOrder;
