import { NavLink } from "react-router";
import styles from "./app-header-link.module.css";

function AppHeaderLink({ ...props }) {
  const paddings = "pl-5 pr-5 pt-4 pb-4 ";

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? `${paddings} ${styles.activeLink}`
          : `text_color_inactive ${paddings} ${styles.link}`;
      }}
      {...props}
    >
      {props.children}
    </NavLink>
  );
}

export default AppHeaderLink;
