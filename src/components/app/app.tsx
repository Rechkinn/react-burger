import { FC, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { Route, Routes, useLocation } from "react-router";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import { getUserData } from "../../services/actions/user-data";
import { updateTokens } from "../../services/actions/token";
import { getCookie } from "../../utils/cookie";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetails from "../ingredient-details/ingredient-details";
import WrapperDetails from "../wrapper-details/wrapper-details";
import IngredientDetailsPage from "../../pages/ingredient-details-page/ingredient-details-page";
import { TLocation } from "../../utils/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const location: TLocation = useLocation();
  const background: TLocation = location.state?.background;
  const { burgerIngredientsRequest, burgerIngredientsRequestFailed } =
    useSelector((store: any) => store.burgerIngredients);

  useEffect(() => {
    dispatch(getBurgerIngredients());

    const tokenCookie: string | null = getCookie("token");
    if (tokenCookie && tokenCookie !== "") {
      dispatch(getUserData());
    } else if (localStorage.getItem("refreshToken")) {
      dispatch(updateTokens());
      dispatch(getUserData());
    }
  }, [dispatch]);

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
          <AppHeader />

          <Routes location={background || location}>
            <Route path="/" element={<Main />} />
            <Route
              path="/ingredients/:id"
              element={<IngredientDetailsPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            >
              <Route
                path="/profile/orders"
                element={<>Скоро здесь будут заказы!</>}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={<WrapperDetails element={<IngredientDetails />} />}
              />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

export default App;
