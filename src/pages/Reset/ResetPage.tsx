import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../utils/normaAPI";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Reset.module.css";
import { Link } from "react-router-dom";

export function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordRequest({ password, token })
      .then(() => {
        localStorage.removeItem("resetPassword");
        navigate("/login");
      })
      .catch((err: Error) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem("resetPassword")) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} pt-6`}>
        <div className="text_type_main-medium pb-4">Восстановление пароля</div>
        <form
          className={`pb-15 ${styles.form}`}
          name="login"
          onSubmit={handleSubmit}
        >
          <div className="pb-4">
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
          <div className="pb-4">
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={(e) => setToken(e.target.value)}
              value={token}
              name="token"
              error={false}
              errorText=""
              size="default"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <div className={`pb-4 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
          {error?.message && (
            <p className={`${styles.error} text_type_main-default pb-4`}>
              {error?.message}
            </p>
          )}
        </form>
        <div className={`${styles.text} text_type_main-default pb-4`}>
          Вспомнили пароль?
          <Link to="/login" className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
