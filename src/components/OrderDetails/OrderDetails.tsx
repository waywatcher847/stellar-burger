import styles from "./OrderDetails.module.css";
import doneImage from "../../image/done.svg";
import waitImage from "../../image/spinning-dots.svg";
import { useDispatch, useSelector } from "../../services/store";
import { selectNewOrder } from "../../services/slices/OrderSlice";

export const OrderDetails = () => {
  const newOrder = useSelector(selectNewOrder);
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_digits-large pb-15">
        {newOrder.order.number}
      </h1>
      <p className="text text_type_main-medium pb-4">{newOrder.name}</p>
      <img
        src={newOrder.success ? doneImage : waitImage}
        alt={"done.svg"}
        className={styles.icon}
      />
      <p className="text pt-15 pb-4">
        {newOrder.success
          ? "Ваш заказ начали готовить"
          : "Ожидание ответа сервера..."}
      </p>
      <p className="text text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
