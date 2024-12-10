import styles from "./Profile.module.css";

import { ProfileMenu } from "./ProfileMenu";
import { logoutUser } from "../../services/slices/authUserSlice";
import { useNavigate } from "react-router-dom";
import { OrderList } from "../../components/Feed/Array/OrderList";

import { useEffect, PointerEvent } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { fetchUser, updateUser } from "../../services/slices/authUserSlice";
export type ProfileMenuUIProps = {
  handleLogout: () => void;
};

export function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.menu} mt-30 mr-15`}>
        <ProfileMenu handleLogout={handleLogout} />
      </div>
      <div className={`mt-10 ml-10 custom-scroll ${styles.orderContainer}`}>
        <OrderList />
      </div>
    </div>
  );
}
