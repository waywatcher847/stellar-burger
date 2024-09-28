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
  return (
    <header className={styles.header}>
      <nav className={styles.menuWrapper}>
        <u className={styles.menu}>
          <li className={styles.menuItem}>
            <div className={styles.button}>
              <BurgerIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Конструктор
              </p>
            </div>
            <div className={styles.button}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </div>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li>
            <div className={styles.button}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </div>
          </li>
        </u>
      </nav>
    </header>
  );
};
