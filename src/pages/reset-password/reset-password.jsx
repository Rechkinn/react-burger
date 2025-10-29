import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doResetPassword } from "../../services/actions/reset-password";
import { collectUserData } from "../../utils/collectUserData";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [inputTokenValue, setInputTokenValue] = useState("");
  const { user } = useSelector((store) => store.userData);
  const { resetPasswordRequest, resetPasswordRequestError } = useSelector(
    (store) => store.resetPassword
  );

  function resetPassword(e) {
    e.preventDefault();
    dispatch(doResetPassword(collectUserData(formRef.current.elements)));
    if (!resetPasswordRequest && !resetPasswordRequestError) {
      navigate("/", { replace: true });
    }
  }

  if (user || !location?.state?.visitedPageForgotPassword) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.main}>
      {resetPasswordRequest && <div>Пробуем сбросить пароль...</div>}
      {resetPasswordRequestError && <div>Ошибка сброса пароля!</div>}
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form action="" ref={formRef} onSubmit={(e) => resetPassword(e)}>
        <Input
          value={inputPasswordValue}
          name="password"
          extraClass={`${styles.input}`}
          placeholder="Введите новый пароль"
          type={!showPassword ? "password" : "text"}
          icon={!showPassword ? "ShowIcon" : "HideIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          onChange={(e) => setInputPasswordValue(e.target.value)}
        />
        <Input
          value={inputTokenValue}
          name="token"
          placeholder="Введите код из письма"
          type="text"
          extraClass={`${styles.input}`}
          onChange={(e) => setInputTokenValue(e.target.value)}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Сохранить
        </Button>
      </form>
      <p className="mt-20">
        <span className="text text_type_main-default">Вспомнили пароль</span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => {
            navigate("/login");
          }}
        >
          Войти
        </Button>
      </p>
    </main>
  );
}
