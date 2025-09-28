import React from "react";
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

class AppHeader extends React.Component {
  state = {
    isOpeningMenu: false,
    isOpeningMenuPersonalAccount: true,
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <div className={`pl-5 pr-5 ${styles.headerInner}`}>
            <nav
              className={
                this.state.isOpeningMenu
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
                    onClick={() => {
                      this.setState((prevState) => ({
                        isOpeningMenuPersonalAccount:
                          !prevState.isOpeningMenuPersonalAccount,
                      }));
                    }}
                  >
                    <ProfileIcon type="secondary" />
                    <span className="pl-2 text text_type_main-small">
                      Личный кабинет
                    </span>
                  </AppHeaderLink>
                  {this.state.isOpeningMenuPersonalAccount && (
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
                  {this.state.isOpeningMenuPersonalAccount ? (
                    <ArrowUpIcon />
                  ) : (
                    <ArrowDownIcon />
                  )}
                </li>
                <li className={styles.li}>
                  <AppHeaderLink>
                    <ListIcon type="secondary" />
                    <span className="pl-2 text text_type_main-small">
                      Лента заказов
                    </span>
                  </AppHeaderLink>
                </li>
                <li className={styles.li}>
                  <AppHeaderLink>
                    <BurgerIcon type="primary" />
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
                this.state.isOpeningMenu
                  ? `${styles.burgerMenu} ${styles.burgerMenuToClose}`
                  : `${styles.burgerMenu}`
              }
              onClick={() => {
                this.setState((prevState) => ({
                  isOpeningMenu: !prevState.isOpeningMenu,
                }));
              }}
            >
              {this.state.isOpeningMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </header>
      </>
    );
  }
}

export default AppHeader;
