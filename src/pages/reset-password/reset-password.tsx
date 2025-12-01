import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { doResetPassword } from "../../services/actions/reset-password";
import { TLocation } from "../../utils/types";
import { useForm } from "../../hooks/useForm";
import { checkInputValue } from "../../utils/checkInputValue";

const ResetPassword: FC = () => {
  const { values, handleChange } = useForm({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: TLocation = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user } = useSelector((store) => store.userData);
  const { resetPasswordRequest, resetPasswordRequestError } = useSelector(
    (store) => store.resetPassword
  );

  function resetPassword(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;
    dispatch(doResetPassword(values));
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
          value={checkInputValue(values.password)}
          name="password"
          extraClass={`${styles.input}`}
          placeholder="Введите новый пароль"
          type={!showPassword ? "password" : "text"}
          icon={!showPassword ? "ShowIcon" : "HideIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          onChange={handleChange}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={checkInputValue(values.token)}
          name="token"
          placeholder="Введите код из письма"
          type="text"
          extraClass={`${styles.input}`}
          onChange={handleChange}
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
