import { useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [activeSection, setActiveSection] = useState("BurgerIngredients");

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section
          className={
            activeSection !== "BurgerIngredients"
              ? `pt-10 ${styles.sectionIngredients} ${styles.hidden1280}`
              : `pt-10 ${styles.sectionIngredients}`
          }
        >
          <BurgerIngredients
            arrayOfIngredients={data}
            openBurgerConstructor={() => setActiveSection("BurgerConstructor")}
          />
        </section>
        <section
          className={
            activeSection !== "BurgerConstructor"
              ? `pl-4 pr-4 ${styles.sectionConstructor} ${styles.hidden1280}`
              : `pl-4 pr-4 ${styles.sectionConstructor}`
          }
        >
          <BurgerConstructor
            arrayOfIngredients={data}
            closeBurgerConstructor={() => setActiveSection("BurgerIngredients")}
          />
        </section>
      </main>
    </>
  );
}

export default App;
