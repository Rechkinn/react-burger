import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [state, setState] = useState({
    activeSection: "BurgerIngredients",
    loading: true,
    hasError: false,
    data: [],
  });

  useEffect(() => {
    const getIngredients = async () => {
      const url = `https://norma.nomoreparties.space/api/ingredients`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) =>
          setState({
            ...state,
            data: data.data,
            loading: false,
            hasError: false,
          })
        )
        .catch((error) =>
          setState({ ...state, hasError: error, loading: false })
        );
    };

    getIngredients();
  }, []);

  return (
    <>
      {state.loading && <div>LOADING...</div>}
      {!state.loading && state.hasError && (
        <div>Error: {state.hasError.message}</div>
      )}
      {!state.loading && !state.hasError && (
        <>
          <AppHeader />
          <main className={styles.main}>
            <section
              className={
                state.activeSection !== "BurgerIngredients"
                  ? `pt-10 ${styles.sectionIngredients} ${styles.hidden1280}`
                  : `pt-10 ${styles.sectionIngredients}`
              }
            >
              <BurgerIngredients
                arrayOfIngredients={state.data}
                openBurgerConstructor={() =>
                  setState({ ...state, activeSection: "BurgerConstructor" })
                }
              />
            </section>
            <section
              className={
                state.activeSection !== "BurgerConstructor"
                  ? `pl-4 pr-4 ${styles.sectionConstructor} ${styles.hidden1280}`
                  : `pl-4 pr-4 ${styles.sectionConstructor}`
              }
            >
              <BurgerConstructor
                arrayOfIngredients={state.data}
                closeBurgerConstructor={() =>
                  setState({ ...state, activeSection: "BurgerIngredients" })
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
