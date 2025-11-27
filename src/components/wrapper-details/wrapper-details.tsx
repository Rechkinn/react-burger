import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import { FC } from "react";
import { TPropsWithReactNode } from "../../utils/types";

const WrapperDetails: FC<TPropsWithReactNode> = ({ element }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      functionToClose={() => {
        window.history.back();
        dispatch({
          type: REMOVE_INGREDIENT_DETAILS,
        });
      }}
      title={"Детали ингредиента"}
    >
      {element}
    </Modal>
  );
};

export default WrapperDetails;
