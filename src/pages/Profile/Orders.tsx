import { OrderList } from "../../components/Feed/Array/OrderList";
import styles from "./Profile.module.css";

export const Orders = () => {
  return (
    <div className={`mt-10 ml-10 custom-scroll ${styles.orderContainer}`}>
      <OrderList />
    </div>
  );
};
