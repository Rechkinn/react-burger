import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { FC, FormEvent, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { collectUserData } from "../../utils/collectUserData";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../services/actions/register";

const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputNameValue, setInputNameValue] = useState<string>("");
  const [inputEmailValue, setInputEmailValue] = useState<string>("");
  const [inputPasswordValue, setInputPasswordValue] = useState<string>("");
  const { user } = useSelector((store: any) => store.userData);
  const { registerRequest, registerRequestError } = useSelector(
    (store: any) => store.register
  );

  function register(e: FormEvent): void {
    e.preventDefault();
    if (formRef.current === null) return;
    dispatch(createNewUser(collectUserData(formRef.current.elements)));
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
          value={inputNameValue}
          name="name"
          placeholder="Имя"
          type="text"
          extraClass={`${styles.input}`}
          error={registerRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={(e) => setInputNameValue(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={inputEmailValue}
          name="email"
          placeholder="E-mail"
          type="text"
          extraClass={`${styles.input}`}
          error={registerRequestError}
          errorText={"Проверьте введённые данные"}
          onChange={(e) => setInputEmailValue(e.target.value)}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          value={inputPasswordValue}
          name="password"
          extraClass={`${styles.input}`}
          placeholder="Пароль"
          type={!showPassword ? "password" : "text"}
          icon={!showPassword ? "ShowIcon" : "HideIcon"}
          error={registerRequestError}
          errorText={"Проверьте введённые данные"}
          onIconClick={() => setShowPassword(!showPassword)}
          onChange={(e) => setInputPasswordValue(e.target.value)}
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
