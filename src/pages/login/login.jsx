import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <Input placeholder="E-mail" type="text" extraClass={`${styles.input}`} />
      <Input
        extraClass={`${styles.input}`}
        placeholder="Пароль"
        type={!showPassword ? "password" : "text"}
        icon={!showPassword ? "ShowIcon" : "HideIcon"}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
        Войти
      </Button>
      <p className="mt-20">
        <span className="text text_type_main-default">
          Вы — новый пользователь?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => {
            navigate("/register");
          }}
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className="mt-4">
        <span className="text text_type_main-default">Забыли пароль?</span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Восстановить пароль
        </Button>
      </p>
    </main>
  );
}
