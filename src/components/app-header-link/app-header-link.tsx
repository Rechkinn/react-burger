import { NavLink } from "react-router";
import styles from "./app-header-link.module.css";
import { FC, PropsWithChildren } from "react";

type TAppHeaderLinkProps = {
  to: string;
  onClick?: () => void;
} & PropsWithChildren;

const AppHeaderLink: FC<TAppHeaderLinkProps> = ({ to, onClick, children }) => {
  const paddings: string = "pl-5 pr-5 pt-4 pb-4 ";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? `${paddings} ${styles.activeLink}`
          : `text_color_inactive ${paddings} ${styles.link}`;
      }}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export default AppHeaderLink;
