import React, { FC, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { Route, Routes, useLocation, useNavigate } from "react-router";
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
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { OrderFeed } from "../../pages/order-feed/order-feed";
import { ProfileOrders } from "../../pages/profile-orders/profile-orders";
import { OrderComposition } from "../order-composition/order-composition";
import { OrderCompositionPage } from "../../pages/order-composition-page/order-composition-page";
import { REMOVE_ORDER } from "../../services/actions/order-details";

const App: FC = React.memo(() => {
  const dispatch = useDispatch();
  const location: TLocation = useLocation();
  const background: TLocation = location.state?.background;

  const { burgerIngredientsRequest, burgerIngredientsRequestFailed } =
    useSelector((store) => store.burgerIngredients);

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

  const navigate = useNavigate();
  useEffect(() => {
    if (
      location.pathname.includes("/feed/") ||
      location.pathname.includes("/profile/orders/")
    ) {
      navigate(location.pathname);
    }
  }, []);

  function removeOrderComposition() {
    dispatch({
      type: REMOVE_ORDER,
    });
  }

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
              <Route path="/profile/orders" element={<ProfileOrders />} />
            </Route>
            <Route
              path="/profile/orders/:number"
              element={<ProtectedRoute element={<OrderCompositionPage />} />}
            />
            <Route path="/feed" element={<OrderFeed />} />
            <Route path="/feed/:number" element={<OrderCompositionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <WrapperDetails
                    element={<IngredientDetails />}
                    title="Детали ингредиента"
                  />
                }
              />
              <Route
                path="/feed/:number"
                element={
                  <WrapperDetails
                    element={<OrderComposition textAlign="start" />}
                    additionalFunction={removeOrderComposition}
                  />
                }
              />
              <Route
                path="/profile/orders/:number"
                element={
                  <WrapperDetails
                    element={<OrderComposition textAlign="start" />}
                    additionalFunction={removeOrderComposition}
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </>
  );
});

export default App;
