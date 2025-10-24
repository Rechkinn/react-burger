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

function App() {
  const { burgerIngredientsRequest, burgerIngredientsRequestFailed } =
    useSelector((store) => store.burgerIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  // const navigate = useNavigate();
  // if (true) {
  //   navigate("/login");
  // }

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={
                  <div className="text text_type_main-large">NOT FOUND 404</div>
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
