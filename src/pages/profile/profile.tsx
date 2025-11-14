import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import styles from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../services/actions/logout";
import { FC, FormEvent, ReactNode, useRef, useState } from "react";
import { updateUserData } from "../../services/actions/user-data";
import { collectUserData } from "../../utils/collectUserData";
import { TLocation } from "../../utils/types";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [visibleButtonsForChange, setVisibleButtonsForChange] =
    useState<boolean>(false);
  const location: TLocation = useLocation();
  const { user, userDataRequest, userDataRequestError } = useSelector(
    (store: any) => store.userData
  );
  const { logoutRequest, logoutRequestError } = useSelector(
    (store: any) => store.logout
  );
  const [inputNameValue, setInputNameValue] = useState<string>(
    user?.name ? user.name : ""
  );
  const [inputEmailValue, setInputEmailValue] = useState<string>(
    user?.email ? user.email : ""
  );
  const [inputPasswordValue, setInputPasswordValue] = useState<string>("");

  function cancelChangeInput(): void {
    setInputNameValue(user.name);
    setInputEmailValue(user.email);
    setInputPasswordValue("");
    setVisibleButtonsForChange(false);
  }

  function handlerSubmitForm(e: FormEvent): void {
    e.preventDefault();
    const changedInputs: HTMLInputElement[] = [];
    if (formRef.current === null) return;
    const inputs: HTMLFormControlsCollection = formRef.current.elements;

    for (let i = 0; i < inputs.length; i++) {
      const input: HTMLInputElement = inputs[i] as HTMLInputElement;

      if (
        (input.value !== user[input.name] && user[input.name] !== undefined) ||
        (input.name === "password" && input.value !== "")
      ) {
        changedInputs.push(input);
      }
    }

    if (changedInputs.length > 0) {
      dispatch(updateUserData(collectUserData(changedInputs)));
      setVisibleButtonsForChange(false);
    }
  }

  function getContent(): ReactNode {
    return location.pathname === "/profile" ? (
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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

  function logout(): ReactNode | void {
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
      {logoutRequest && <div>Пробуем выйти из профиля...</div>}
      {logoutRequestError && <div>Ошибка выхода из профиля!</div>}
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
};

export default Profile;
