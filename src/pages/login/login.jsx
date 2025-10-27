import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../services/actions/login";
import { collectUserData } from "../../utils/collectUserData";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((store) => store.userData);
  const { loginRequest, loginRequestError } = useSelector(
    (store) => store.login
  );

  function login(e) {
    e.preventDefault();
    dispatch(doLogin(collectUserData(formRef.current.elements)));
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.main}>
      {loginRequest && <div>Авторизация пользователя...</div>}
      {loginRequestError && <div>Ошибка авторизации.</div>}
      <h1 className="text text_type_main-medium">Вход</h1>
      <form action="" ref={formRef} onSubmit={(e) => login(e)}>
        <Input
          value={inputEmailValue}
          name="email"
          placeholder="E-mail"
          type="text"
          extraClass={`${styles.input}`}
          error={loginRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={(e) => setInputEmailValue(e.target.value)}
        />
        <Input
          value={inputPasswordValue}
          name="password"
          extraClass={`${styles.input}`}
          placeholder="Пароль"
          type={!showPassword ? "password" : "text"}
          icon={!showPassword ? "ShowIcon" : "HideIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          error={loginRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={(e) => setInputPasswordValue(e.target.value)}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Войти
        </Button>
      </form>
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
