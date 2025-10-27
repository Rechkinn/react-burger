import { useState } from "react";
import {
  ListIcon,
  BurgerIcon,
  Logo,
  MenuIcon,
  CloseIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import AppHeaderLink from "../app-header-link/app-header-link";
import { useLocation } from "react-router-dom";

function AppHeader() {
  const [state, setState] = useState({
    isOpeningMenu: false,
    isOpeningMenuPersonalAccount: true,
  });

  const location = useLocation();

  function getTypeIcon(path) {
    let str;
    if (location.pathname === path) return "primary";
    str = location.pathname.split("/")[1];
    return path.includes(str) && str !== "" ? "primary" : "secondary";
  }

  return (
    <header className={styles.header}>
      <div className={`pl-5 pr-5 ${styles.headerInner}`}>
        <nav
          className={
            state.isOpeningMenu
              ? `${styles.nav} ${styles.show}`
              : `${styles.nav}`
          }
        >
          <h1
            className={`ml-5 mt-2 text text_type_main-large ${styles.navHeader}`}
          >
            Меню
          </h1>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <AppHeaderLink
                to="/profile"
                onClick={() => {
                  setState({
                    ...state,
                    isOpeningMenuPersonalAccount:
                      !state.isOpeningMenuPersonalAccount,
                  });
                }}
              >
                <ProfileIcon type={getTypeIcon("/profile")} />
                <span className="pl-2 text text_type_main-small">
                  Личный кабинет
                </span>
              </AppHeaderLink>
              {state.isOpeningMenuPersonalAccount && (
                <ul className={styles.menuPersonalAccount}>
                  {["Профиль", "История заказов", "Выход"].map(
                    (elementMenu) => {
                      return (
                        <li key={elementMenu} className="ml-6">
                          <AppHeaderLink>
                            <span className="pl-2 text text_type_main-small">
                              {elementMenu}
                            </span>
                          </AppHeaderLink>
                        </li>
                      );
                    }
                  )}
                </ul>
              )}
              {state.isOpeningMenuPersonalAccount ? (
                <ArrowUpIcon />
              ) : (
                <ArrowDownIcon />
              )}
            </li>
            <li className={styles.li}>
              <AppHeaderLink to="404">
                <ListIcon type={getTypeIcon("/404")} />
                <span className="pl-2 text text_type_main-small">
                  Лента заказов
                </span>
              </AppHeaderLink>
            </li>
            <li className={styles.li}>
              <AppHeaderLink to="">
                <BurgerIcon type={getTypeIcon("/")} />
                <span className="pl-2 text text_type_main-small">
                  Конструктор
                </span>
              </AppHeaderLink>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>
        <button
          className={
            state.isOpeningMenu
              ? `${styles.burgerMenu} ${styles.burgerMenuToClose}`
              : `${styles.burgerMenu}`
          }
          onClick={() => {
            setState({
              ...state,
              isOpeningMenu: !state.isOpeningMenu,
            });
          }}
        >
          {state.isOpeningMenu ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
