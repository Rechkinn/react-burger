import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { FC, FormEvent, useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "../../utils/additionalStorageTyping";
import { doForgotPassword } from "../../services/actions/forgot-password";
import { useForm } from "../../hooks/useForm";
import { checkInputValue } from "../../utils/checkInputValue";

const ForgotPassword: FC = () => {
  const { values, handleChange } = useForm({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useSelector((store) => store.userData);
  const { forgotPasswordRequest, forgotPasswordRequestError } = useSelector(
    (store) => store.forgotPassword
  );

  function forgotPassword(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;

    const inputElement: HTMLInputElement = formRef.current
      .elements[0] as HTMLInputElement;

    if (inputElement.value !== "") {
      dispatch(doForgotPassword(values));
      if (!forgotPasswordRequest && !forgotPasswordRequestError) {
        navigate("/reset-password", {
          replace: true,
          state: { visitedPageForgotPassword: true },
        });
      }
    }
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.main}>
      {forgotPasswordRequest && <div>Пробуем сбросить пароль...</div>}
      {forgotPasswordRequestError && <div>Ошибка сброса пароля!</div>}
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form action="" ref={formRef} onSubmit={(e) => forgotPassword(e)}>
        <Input
          value={checkInputValue(values.password)}
          name="email"
          placeholder="Укажите e-mail"
          type="email"
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
          Восстановить
        </Button>
      </form>
      <p className="mt-20">
        <span className="text text_type_main-default">Вспомнили пароль?</span>
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

export default ForgotPassword;
