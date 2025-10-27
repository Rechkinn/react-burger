import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { getUserData } from "../../services/actions/user-data";
import { updateTokens } from "../../services/actions/token";
import { getCookie } from "../../utils/cookie";
import NotFound from "../../pages/not-found/not-found";

function App() {
  const { burgerIngredientsRequest, burgerIngredientsRequestFailed } =
    useSelector((store) => store.burgerIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBurgerIngredients());

    const tokenCookie = getCookie("token");
    if (tokenCookie && tokenCookie !== "") {
      dispatch(getUserData());
    } else if (localStorage.getItem("refreshToken")) {
      dispatch(updateTokens());
      dispatch(getUserData());
    }
  }, []);

  return (
    <>
      {burgerIngredientsRequest && (
        <div className="text text_type_main-large">Загрузка данных...</div>
      )}
      {!burgerIngredientsRequest && burgerIngredientsRequestFailed && (
        <div className="text text_type_main-large">
          Ошибка получения данных об ингредиентах!
        </div>
      )}
      {!burgerIngredientsRequest && !burgerIngredientsRequestFailed && (
        <>
          <BrowserRouter>
            <AppHeader />
            <Routes>
              <Route path="/" element={<Main />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/profile"
                element={<ProtectedRouteElement element={<Profile />} />}
              >
                <Route
                  path="/profile/orders"
                  element={<>Скоро здесь будут заказы!</>}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
