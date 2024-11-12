import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { fetchUser, updateUser } from "../../services/slices/authUserSlice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileMenu } from "./ProfileMenu";
import { logoutUser } from "../../services/slices/authUserSlice";
import { useNavigate } from "react-router-dom";

export type ProfileMenuUIProps = {
  handleLogout: () => void;
};

export function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  useEffect(() => {
    setuserInfo((prevState) => ({
      ...prevState,
      name: user?.name || "",
      email: user?.email || "",
    }));
  }, [user]);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(userInfo));
    setuserInfo({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setuserInfo({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const infoChanged =
    userInfo.name !== user?.name ||
    userInfo.email !== user?.email ||
    !!userInfo.password;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.menu} mt-30 mr-15`}>
        <ProfileMenu handleLogout={handleLogout} />
      </div>
      <form className={`${styles.form} mt-30`} onSubmit={handleSubmit}>
        <div>
          <div className="pb-4">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleInputChange}
              value={userInfo.name}
              name={"name"}
              error={false}
              errorText={""}
              size={"default"}
              icon={"EditIcon"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <div className="pb-4">
            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={handleInputChange}
              value={userInfo.email}
              name={"email"}
              error={false}
              errorText={""}
              size={"default"}
              icon={"EditIcon"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <div className="pb-4">
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={handleInputChange}
              value={userInfo.password}
              name={"password"}
              error={false}
              errorText={""}
              size={"default"}
              icon={"EditIcon"}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          {infoChanged && (
            <div className={styles.button}>
              <Button
                htmlType="button"
                size="medium"
                type="secondary"
                onClick={handleCancel}
              >
                Отменить
              </Button>
              <Button htmlType="submit" size="medium" type="primary">
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
