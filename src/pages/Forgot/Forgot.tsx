import { useState, FormEvent, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../../utils/normaAPI";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    forgotPasswordRequest({ email })
      .then(() => {
        localStorage.setItem("resetPassword", "true");
        navigate("/reset-password", { replace: true });
      })
      .catch((err: Error) => setError(err));
  };

  const handlePointerEvent = (e: PointerEvent<HTMLDivElement>) => {
    // Do nothing
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} pt-6`}>
        <div className="text_type_main-medium pb-4">Восстановление пароля</div>
        <form
          className={`${styles.form} pb-15`}
          name="login"
          onSubmit={handleSubmit}
        >
          <div className="pb-4">
            <Input
              value={email}
              type="email"
              placeholder="Укажите e-mail"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              error={false}
              errorText=""
              size="default"
              onPointerEnterCapture={handlePointerEvent}
              onPointerLeaveCapture={handlePointerEvent}
            />
          </div>
          <div className={`pb-4 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Восстановить
            </Button>
          </div>
          {error?.message && (
            <p className={`text_type_main-default  ${styles.error} pb-4`}>
              {error?.message}
            </p>
          )}
        </form>
        <div className={`text_type_main-default ${styles.question} pb-4`}>
          Вспомнили пароль?
          <Link to={"/login"} className={`${styles.link} pl-2`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
