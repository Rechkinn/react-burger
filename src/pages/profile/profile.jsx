import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import styles from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../services/actions/logout";
import { useRef, useState } from "react";
import { updateUserData } from "../../services/actions/user-data";
import { collectUserData } from "../../utils/collectUserData";

export default function Profile() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [visibleButtonsForChange, setVisibleButtonsForChange] = useState(false);
  const { pathname } = useLocation();
  const { user, userDataRequest, userDataRequestError } = useSelector(
    (store) => store.userData
  );
  const { logoutRequest, logoutRequestError } = useSelector(
    (store) => store.logout
  );
  const [inputNameValue, setInputNameValue] = useState(
    user?.name ? user.name : ""
  );
  const [inputEmailValue, setInputEmailValue] = useState(
    user?.email ? user.email : ""
  );
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  function cancelChangeInput() {
    setInputNameValue(user.name);
    setInputEmailValue(user.email);
    setInputPasswordValue("");
    setVisibleButtonsForChange(false);
  }

  function handlerSubmitForm(e) {
    e.preventDefault();
    const changedInputs = [];
    const inputs = formRef.current.elements;

    for (let i = 0; i < inputs.length; i++) {
      if (
        (inputs[i].value !== user[inputs[i].name] &&
          user[inputs[i].name] !== undefined) ||
        (inputs[i].name === "password" && inputs[i].value !== "")
      ) {
        changedInputs.push(inputs[i]);
      }
    }

    if (changedInputs.length > 0) {
      dispatch(updateUserData(collectUserData(changedInputs)));
    }
  }

  function getContent() {
    return pathname === "/profile" ? (
      <>
        {userDataRequest && <div>Пытаемся изменить данные...</div>}
        {userDataRequestError && <div>Ошибка изменения данных!</div>}
        <form action="" ref={formRef} onSubmit={(e) => handlerSubmitForm(e)}>
          <Input
            name="name"
            placeholder="Имя"
            type="text"
            value={inputNameValue}
            icon="EditIcon"
            onChange={(e) => {
              setInputNameValue(e.target.value);
              setVisibleButtonsForChange(true);
            }}
          />
          <Input
            name="email"
            extraClass="mt-6"
            placeholder="Логин"
            type="text"
            value={inputEmailValue}
            icon="EditIcon"
            onChange={(e) => {
              setInputEmailValue(e.target.value);
              setVisibleButtonsForChange(true);
            }}
          />
          <Input
            name="password"
            extraClass="mt-6"
            placeholder="Пароль"
            type="password"
            value={inputPasswordValue}
            icon="EditIcon"
            onChange={(e) => {
              setInputPasswordValue(e.target.value);
              setVisibleButtonsForChange(true);
            }}
          />
          {visibleButtonsForChange && (
            <div className={`mt-6 ${styles.containerButtons}`}>
              <Button
                htmlType="button"
                type="secondary"
                onClick={cancelChangeInput}
              >
                Отмена
              </Button>
              <Button htmlType="submit">Сохранить</Button>
            </div>
          )}
        </form>
      </>
    ) : (
      <Outlet />
    );
  }

  function logout() {
    dispatch(doLogout());
    if (!logoutRequestError && !logoutRequest) {
      return <Navigate to="/login" replace />;
    }
  }

  if (!user) {
    return null;
  }

  return (
    <>
      {user && (
        <main className={styles.main}>
          <div
            className={`text text_type_main-medium ${styles.containerLinks}`}
          >
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => {
                return isActive
                  ? `${styles.activeLink}`
                  : `text_color_inactive ${styles.link}`;
              }}
            >
              Профиль
            </NavLink>
            <NavLink
              to="/profile/orders"
              end
              className={({ isActive }) => {
                return isActive
                  ? `${styles.activeLink}`
                  : `text_color_inactive ${styles.link}`;
              }}
            >
              История заказов
            </NavLink>
            <p
              className={`text_color_inactive ${styles.fakeLink}`}
              onClick={logout}
            >
              Выход
            </p>
            <p className="mt-20 text_type_main-small text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div>{getContent()}</div>
        </main>
      )}
    </>
  );
}
