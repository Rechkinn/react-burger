import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const url = `https://norma.nomoreparties.space`;

function App() {
  const [activeSection, setActiveSection] = useState("BurgerConstructor");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getIngredients = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url}/api/ingredients`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getIngredients();

    return () => controller.abort();
  }, []);

  return (
    <>
      {isLoading && <div className="text text_type_main-large">LOADING...</div>}
      {error && (
        <div className="text text_type_main-large">Error: {error.message}</div>
      )}
      {data && (
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
                objectToOpenSectionBurgerConstructor={{
                  currentSection: activeSection,
                  func: () => setActiveSection("BurgerConstructor"),
                }}
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
                closeBurgerConstructor={() =>
                  setActiveSection("BurgerIngredients")
                }
              />
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default App;
