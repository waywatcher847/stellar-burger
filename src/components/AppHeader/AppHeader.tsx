import { useState, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store";
import { useEffect } from "react";
import { fetchUser } from "../../services/slices/authUserSlice";
import { setCookie, getCookie } from "../../utils/cookie";
export const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [active, setActive] = useState("Constructor");
  const textActive = "text text_type_main-default text_color_primary";
  const textInactive = "text text_type_main-default text_color_inactive";

  useEffect(() => {
    if (getCookie("accessToken")) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <nav className={styles.menuWrapper}>
        <u className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.button} ${textActive}`
                  : `${styles.button} ${textInactive}`
              }
              onClick={() => setActive("Constructor")}
            >
              <BurgerIcon
                type={active === "Constructor" ? "primary" : "secondary"}
              />
              <p
                className={active === "Constructor" ? textActive : textInactive}
              >
                Конструктор
              </p>
            </NavLink>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive
                  ? `${styles.button} ${textActive}`
                  : `${styles.button} ${textInactive}`
              }
              onClick={() => setActive("Orders")}
            >
              <ListIcon type={active === "Orders" ? "primary" : "secondary"} />
              <p className={active === "Orders" ? textActive : textInactive}>
                Лента заказов
              </p>
            </NavLink>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.button} ${textActive}`
                  : `${styles.button} ${textInactive}`
              }
              onClick={() => setActive("Profile")}
            >
              <ProfileIcon
                type={active === "Profile" ? "primary" : "secondary"}
              />
              <p className={active === "Profile" ? textActive : textInactive}>
                {user?.name || "Личный кабинет"}
              </p>
            </NavLink>
          </li>
        </u>
      </nav>
    </header>
  );
};
