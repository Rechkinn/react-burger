import styles from "./app-header-link.module.css";

function AppHeaderLink({ href, ...props }) {
  const paddings = "pl-5 pr-5 pt-4 pb-4 ";

  return (
    <a
      href={href ? href : "#"}
      className={`${paddings} ${styles.a}`}
      {...props}
    >
      {props.children}
    </a>
  );
}

export default AppHeaderLink;
