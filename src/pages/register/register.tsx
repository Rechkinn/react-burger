import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../services/actions/register";
import { useForm } from "../../hooks/useForm";
import { checkInputValue } from "../../utils/checkInputValue";

const Register: FC = () => {
  const { values, handleChange } = useForm({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user } = useSelector((store: any) => store.userData);
  const { registerRequest, registerRequestError } = useSelector(
    (store: any) => store.register
  );

  function register(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;
    dispatch(createNewUser(values));
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className={styles.main}>
      {registerRequest && <div>Создание нового пользователя...</div>}
      {registerRequestError && (
        <div>
          Ошибка при создании нового пользователя! Проверьте введённые данные!
        </div>
      )}
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form action="" ref={formRef} onSubmit={(e) => register(e)}>
        <Input
          value={checkInputValue(values.name)}
          name="name"
          placeholder="Имя"
          type="text"
          extraClass={`${styles.input}`}
          error={registerRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={handleChange}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={checkInputValue(values.email)}
          name="email"
          placeholder="E-mail"
          type="text"
          extraClass={`${styles.input}`}
          error={registerRequestError}
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
          error={registerRequestError}
          errorText={"Проверьте введённые данные"}
          onIconClick={() => setShowPassword(!showPassword)}
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
          Зарегистрироваться
        </Button>
      </form>
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
};

export default Register;
