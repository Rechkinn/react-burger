import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";
import { checkInputValue } from "../../utils/checkInputValue";
import { TLocation } from "../../utils/types";

const Login: FC = () => {
  const { values, handleChange } = useForm({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user } = useSelector((store: any) => store.userData);
  const { loginRequest, loginRequestError } = useSelector(
    (store: any) => store.login
  );

  function login(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;
    dispatch(doLogin(values));
  }

  const location: TLocation = useLocation();
  const from = location.state?.from || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <main className={styles.main}>
      {loginRequest && <div>Авторизация пользователя...</div>}
      {loginRequestError && <div>Ошибка авторизации.</div>}
      <h1 className="text text_type_main-medium">Вход</h1>
      <form action="" ref={formRef} onSubmit={(e) => login(e)}>
        <Input
          value={checkInputValue(values.email)}
          name="email"
          placeholder="E-mail"
          type="text"
          extraClass={`${styles.input}`}
          error={loginRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={handleChange}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={checkInputValue(values.password)}
          name="password"
          extraClass={`${styles.input}`}
          placeholder="Пароль"
          type={!showPassword ? "password" : "text"}
          icon={!showPassword ? "ShowIcon" : "HideIcon"}
          onIconClick={() => setShowPassword(!showPassword)}
          error={loginRequestError}
          errorText={"Проверьте введённые данные"}
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
};

export default Login;
