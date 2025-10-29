import { useNavigate } from "react-router";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";
import PropTypes from "prop-types";

export default function WrapperDetails({ element }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal
      functionToClose={() => {
        // navigate("/");
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
}

WrapperDetails.propTypes = {
  element: PropTypes.node.isRequired,
};
