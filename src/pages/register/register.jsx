import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { collectUserData } from "../../utils/collectUserData";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../services/actions/register";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((store) => store.userData);
  const { registerRequest, registerRequestError } = useSelector(
    (store) => store.register
  );

  const [inputNameValue, setInputNameValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  const formRef = useRef();

  const dispatch = useDispatch();

  function register(e) {
    e.preventDefault();
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
}
