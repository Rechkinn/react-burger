import { useNavigate } from "react-router";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";

export default function WrapperDetails({ element }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal
      functionToClose={() => {
        navigate("/");
        dispatch({
          type: REMOVE_INGREDIENT_DETAILS,
        });
      }}
      title={"Детали ингредиента"}
    >
      {element}
    </Modal>
  );
}
