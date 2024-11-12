import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { registerUser } from "../../services/slices/authUserSlice";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export function RegisterPage() {
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    const resultActionRegister = await dispatch(
      registerUser({ name: userName, password, email }),
    );
    if (registerUser.fulfilled.match(resultActionRegister)) {
      navigate("/");
    } else if (registerUser.rejected.match(resultActionRegister)&&resultActionRegister.error.message) {
      setError(resultActionRegister.error?.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`pt-4 ${styles.wrapper}`}>
        <div className="pb-4 text_type_main-medium">Регистрация</div>
        <form
          className={`pb-15 ${styles.form}`}
          name="register"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="pb-4">
              <Input
                type="text"
                placeholder="Имя"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                name="name"
                error={false}
                errorText=""
                size="default"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <div className="pb-4">
              <Input
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name={"email"}
                error={false}
                errorText=""
                size={"default"}
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
                Зарегистрироваться
              </Button>
            </div>
            {error && (
              <p className={`text_type_main-default ${styles.error}  pb-4`}>
                {error}
              </p>
            )}
          </div>
        </form>
        <div className={`text_type_main-default ${styles.text} pb-4`}>
          Уже зарегистрированы?
          <Link to="/login" className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
