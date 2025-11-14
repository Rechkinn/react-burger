import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getCookie } from "../../utils/cookie";
import { FC } from "react";
import { TPropsWithReactNode } from "../../utils/types";

const ProtectedRoute: FC<TPropsWithReactNode> = ({ element }) => {
  const { user, userDataRequestError, userDataRequest } = useSelector(
    (store: any) => store.userData
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
};

export default ProtectedRoute;
