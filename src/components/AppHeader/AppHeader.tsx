import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

export const Appheader = () => {
  const [active, setActive] = React.useState('Constructor');
  const textActive = "text text_type_main-default text_color_primary";
  const textInactive = "text text_type_main-default text_color_inactive";
  return (
    <header className={styles.header}>
      <nav className={styles.menuWrapper}>
        <u className={styles.menu}>
          <li className={styles.menuItem}>
            <div className={styles.button} onClick={() => setActive("Constructor")}>
              <BurgerIcon type = {active === "Constructor"?"primary":"secondary"}  />
              <p className={active === "Constructor"?textActive:textInactive}>
                Конструктор
              </p>
            </div>
            <div className={styles.button} onClick={() => setActive("Orders")}>
              <ListIcon type = {active === "Orders"?"primary":"secondary"} />
              <p className={active === "Orders"?textActive:textInactive}>
                Лента заказов
              </p>
            </div>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li>
            <div className={styles.button} onClick={() => setActive("Profile")}>
              <ProfileIcon type={active === "Profile"?"primary":"secondary"} />
              <p className={active === "Profile"?textActive:textInactive}>
                Личный кабинет
              </p>
            </div>
          </li>
        </u>
      </nav>
    </header>
  );
};
