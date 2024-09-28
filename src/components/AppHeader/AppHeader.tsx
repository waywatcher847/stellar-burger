import React from "react";
import { NavLink } from "react-router-dom";
import headerstyles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

export const Appheader = () => {
  return (
    <header className={headerstyles.header}>
      <nav className={headerstyles.menuWrapper}>
        <u className={headerstyles.menu}>
          <li className={headerstyles.menuItem}>
            <div className={headerstyles.button}>
              <BurgerIcon type="secondary" />
              <text className="text text_type_main-default text_color_inactive">
                Конструктор
              </text>
            </div>
            <div className={headerstyles.button}>
              <ListIcon type="secondary" />
              <text className="text text_type_main-default text_color_inactive">
                Лента заказов
              </text>
            </div>
          </li>
          <li className={headerstyles.logo}>
            <Logo />
          </li>
          <li>
            <div className={headerstyles.button}>
              <ProfileIcon type="secondary" />
              <text className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </text>
            </div>
          </li>
        </u>
      </nav>
    </header>
  );
};
