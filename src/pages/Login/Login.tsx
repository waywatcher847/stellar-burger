import { SyntheticEvent, useState } from "react";
import { useDispatch } from "../../services/store";
import { loginUser } from "../../services/slices/authUserSlice";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    const resultActionLogin = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultActionLogin)) {
      navigate("/");
    } else if (loginUser.rejected.match(resultActionLogin)) {
      setError("Неправильный логин или пароль");
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} pt-6`}>
        <div className="text_type_main-medium pb-4 ">Вход</div>
        <form
          className={`pb-15 ${styles.form}`}
          name="login"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="pb-4">
              <Input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                error={false}
                errorText=""
                size="default"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <div className="pb-4">
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
            </div>
            <div className={`${styles.button} pb-4`}>
              <Button type="primary" size="medium" htmlType="submit">
                Войти
              </Button>
            </div>
            {error && (
              <p className={`${styles.error} text_type_main-default pb-4`}>
                {error}
              </p>
            )}
          </div>
        </form>
        <div className={` text_type_main-default ${styles.text} pb-4 `}>
          Вы - новый пользователь?
          <Link to="/register" className={`${styles.link} pl-2`}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={`text_type_main-default ${styles.text} pb-4`}>
          Забыли пароль?
          <Link to={"/forgot-password"} className={`${styles.link} pl-2`}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};
