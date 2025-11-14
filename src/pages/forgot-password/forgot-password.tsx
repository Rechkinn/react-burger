import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doForgotPassword } from "../../services/actions/forgot-password";
import { collectUserData } from "../../utils/collectUserData";

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [inputEmailValue, setInputEmailValue] = useState<string>("");
  const { user } = useSelector((store: any) => store.userData);
  const { forgotPasswordRequest, forgotPasswordRequestError } = useSelector(
    (store: any) => store.forgotPassword
  );

  function forgotPassword(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;

    const inputElement: HTMLInputElement = formRef.current
      .elements[0] as HTMLInputElement;

    if (inputElement.value !== "") {
      dispatch(doForgotPassword(collectUserData(formRef.current.elements)));
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
          value={inputEmailValue}
          name="email"
          placeholder="Укажите e-mail"
          type="email"
          extraClass={`${styles.input}`}
          onChange={(e) => setInputEmailValue(e.target.value)}
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
