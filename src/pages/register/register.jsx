import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input placeholder="Имя" type="text" extraClass={`${styles.input}`} />
      <Input placeholder="E-mail" type="text" extraClass={`${styles.input}`} />
      <Input
        extraClass={`${styles.input}`}
        placeholder="Пароль"
        type={!showPassword ? "password" : "text"}
        icon={!showPassword ? "ShowIcon" : "HideIcon"}
        onIconClick={() => setShowPassword(!showPassword)}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
        Зарегистрироваться
      </Button>
      <p className="mt-20">
        <span className="text text_type_main-default">
          Уже зарегистрированы?
        </span>
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
