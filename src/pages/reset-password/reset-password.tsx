import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doResetPassword } from "../../services/actions/reset-password";
import { collectUserData } from "../../utils/collectUserData";
import { TLocation } from "../../utils/types";

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: TLocation = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputPasswordValue, setInputPasswordValue] = useState<string>("");
  const [inputTokenValue, setInputTokenValue] = useState<string>("");
  const { user } = useSelector((store: any) => store.userData);
  const { resetPasswordRequest, resetPasswordRequestError } = useSelector(
    (store: any) => store.resetPassword
  );

  function resetPassword(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;
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
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={inputTokenValue}
          name="token"
          placeholder="Введите код из письма"
          type="text"
          extraClass={`${styles.input}`}
          onChange={(e) => setInputTokenValue(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
};

export default ResetPassword;
