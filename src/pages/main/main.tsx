import { FC, useState } from "react";
import styles from "./main.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main: FC = () => {
  const [activeSection, setActiveSection] =
    useState<string>("BurgerConstructor");
  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <section
          className={
            activeSection !== "BurgerIngredients"
              ? `pt-10 ${styles.sectionIngredients} ${styles.hidden1280}`
              : `pt-10 ${styles.sectionIngredients}`
          }
        >
          <BurgerIngredients />
        </section>
        <section
          className={
            activeSection !== "BurgerConstructor"
              ? `pl-4 pr-4 ${styles.sectionConstructor} ${styles.hidden1280}`
              : `pl-4 pr-4 ${styles.sectionConstructor}`
          }
        >
          <BurgerConstructor
            closeBurgerConstructor={() => setActiveSection("BurgerIngredients")}
          />
        </section>
      </DndProvider>
    </main>
  );
};

export default Main;
