import React from "react";
import styles from "./Feed.module.css";
import { ordersSelector } from "../../services/slices/FeedSlice";
import { useSelector } from "../../services/store";

export const Panel = () => {
  const ordersFinished = useSelector(ordersSelector)
    ?.filter((item) => item.status === "done")
    .slice(0, 10);
  const ordersInWork = useSelector(ordersSelector)
    ?.filter((item) => item.status === "pending")
    .slice(0, 10);

  return (
    <div className={styles.panel}>
      <div>
        <h2 className="mb-6 text_type_main-medium">Готовы:</h2>
        <ul className={`${styles.numbers} ${styles.numbersaccent}`}>
          {ordersFinished?.map((order) => (
            <li key={order._id}>
              <p className="text text_type_digits-default">{order.number}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-6 text_type_main-medium">В работе:</h2>
        <ul className={styles.numbers}>
          {ordersInWork?.map((order) => (
            <li key={order._id}>
              <p className="text_type_digits-default">{order.number}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
