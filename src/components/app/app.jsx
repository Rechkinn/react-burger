import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [activeSection, setActiveSection] = useState("BurgerConstructor");
  const { burgerIngredientsRequest, burgerIngredientsRequestFailed } =
    useSelector((store) => store.burgerIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <>
      {burgerIngredientsRequest && (
        <div className="text text_type_main-large">Загрузка данных...</div>
      )}
      {!burgerIngredientsRequest && burgerIngredientsRequestFailed && (
        <div className="text text_type_main-large">
          Ошибка получения данных об ингредиентах!
        </div>
      )}
      {!burgerIngredientsRequest && !burgerIngredientsRequestFailed && (
        <>
          <AppHeader />
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
                  closeBurgerConstructor={() =>
                    setActiveSection("BurgerIngredients")
                  }
                />
              </section>
            </DndProvider>
          </main>
        </>
      )}
    </>
  );
}

export default App;
