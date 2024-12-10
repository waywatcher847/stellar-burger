import { useState, FC } from "react";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import { ProfileMenuUIProps } from "./ProfilePage";

export const ProfileMenu: FC<ProfileMenuUIProps> = ({ handleLogout }) => (
  <div>
    <NavLink
      to={"/profile"}
      className={({ isActive }) =>
        `text_type_main-medium pt-4 pb-4 ${styles.link} ${"text_color_inactive"}`
      }
    >
      Профиль
    </NavLink>
    <NavLink
      to={"/profile/orders"}
      className={({ isActive }) =>
        `text_type_main-medium pt-4 pb-4 ${styles.link} ${"text_color_inactive"}`
      }
    >
      История заказов
    </NavLink>
    <button
      onClick={handleLogout}
      className={`text_type_main-medium ${styles.button} pt-4 pb-4`}
    >
      Выход
    </button>
    <p className="text_type_main-default text_color_inactive pt-10">
      В этом разделе вы можете изменить свои персональные данные
    </p>
  </div>
);
