import { FC } from "react";
import styles from "./not-found.module.css";

const NotFound: FC = () => {
  return (
    <p className={`text text_type_main-medium ${styles.notFound}`}>
      В Stellar Burgers ещё не обнаружили такой страницы!
      <br />
      Проверьте правильность введённого URL.
    </p>
  );
};

export default NotFound;
