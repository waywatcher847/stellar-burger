import { ChangeEvent, useState, FormEvent, PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { registerUser } from "../../services/slices/authUserSlice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
interface TPasswordInputInterface
  extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "type" | "ref"> {
  value: string;
  placeholder?: string;
  size?: "default" | "small";
  icon?: "HideIcon" | "ShowIcon" | "EditIcon";
  errorText?: string;
  checkValid?: (isValid: boolean) => void;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
export declare const PasswordInput: React.FC<TPasswordInputInterface>;

export function RegisterPage() {
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const resultActionRegister = await dispatch(
      registerUser({ name: userName, password, email }),
    );
    if (registerUser.fulfilled.match(resultActionRegister)) {
      navigate("/");
    } else if (
      registerUser.rejected.match(resultActionRegister) &&
      resultActionRegister.error.message
    ) {
      setError(resultActionRegister.error?.message);
    }
  };
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePointerEvent = (e: PointerEvent<HTMLDivElement>) => {
    // Do nothing
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
                onChange={handleChangeValue}
                value={userName}
                name="name"
                error={false}
                errorText=""
                size="default"
                onPointerEnterCapture={handlePointerEvent}
                onPointerLeaveCapture={handlePointerEvent}
              />
            </div>
            <div className="pb-4">
              <Input
                type="email"
                placeholder="E-mail"
                onChange={handleChangeMail}
                value={email}
                name={"email"}
                error={false}
                errorText=""
                size={"default"}
                onPointerEnterCapture={handlePointerEvent}
                onPointerLeaveCapture={handlePointerEvent}
              />
            </div>
            <div className="pb-4">
              <PasswordInput
                onChange={handleChangePassword}
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
