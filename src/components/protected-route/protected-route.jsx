import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getCookie } from "../../utils/cookie";
import PropTypes from "prop-types";

export default function ProtectedRoute({ element }) {
  const { user, userDataRequestError, userDataRequest } = useSelector(
    (store) => store.userData
  );

  if (getCookie("token")) {
    if (!user) {
      return null;
    }
  }

  return (
    <>
      {userDataRequest && <div>Загрузка данных пользователя...</div>}
      {userDataRequestError && <div>Ошибка загрузки данных пользователя!</div>}
      {!user ? <Navigate to="/login" replace /> : element}
    </>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
