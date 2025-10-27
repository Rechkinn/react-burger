import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRouteElement({ element }) {
  const { user, userDataRequestError, userDataRequest } = useSelector(
    (store) => store.userData
  );

  return user ? element : <Navigate to="/login" replace />;
}
